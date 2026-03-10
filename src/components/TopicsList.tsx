import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { TOPICS, type Topic } from '../constants';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const TopicsList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>(TOPICS);

  useEffect(() => {
    let mounted = true;

    const loadTopics = async () => {
      try {
        const topicsXlsxUrl = new URL('../topics.xlsx', import.meta.url).href;
        const response = await fetch(topicsXlsxUrl, { cache: 'no-store' });
        if (!response.ok) {
          return;
        }

        const fileBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(fileBuffer, { type: 'array', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          return;
        }

        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json<(string | number | Date | null)[]>(sheet, {
          header: 1,
          raw: true,
        });
        if (rows.length === 0) {
          return;
        }

        const headerRow = rows[0];
        const dateIndex = findColumnIndex(headerRow, ['日付', 'date']);
        const categoryIndex = findColumnIndex(headerRow, ['カテゴリ', 'category']);
        const tagIndex = findColumnIndex(headerRow, ['タグ', 'tag']);
        const titleIndex = findColumnIndex(headerRow, ['トピック', 'タイトル', 'title']);
        const isNewIndex = findColumnIndex(headerRow, ['new', 'isnew', 'new表示', '公開']);
        const tagCheckboxColumns = getTagCheckboxColumns(headerRow);

        const parsedTopics = rows
          .slice(1)
          .map((row, index) => {
            const dateValue = row[dateIndex >= 0 ? dateIndex : 0];
            const categoryValue = row[categoryIndex >= 0 ? categoryIndex : 1];
            const tagValue = row[tagIndex];
            const titleValue = row[titleIndex >= 0 ? titleIndex : 2];
            const explicitTag = (tagValue ?? '').toString().trim();
            const checkedTag = getCheckedTagFromColumns(row, tagCheckboxColumns);
            const resolvedTag = explicitTag || checkedTag;
            const title = (titleValue ?? '').toString().trim();
            if (!title) {
              return null;
            }

            const fallbackIsNew = index < 2;
            const resolvedIsNew = isNewIndex >= 0 ? parseIsNewValue(row[isNewIndex]) : fallbackIsNew;

            return {
              id: index + 1,
              date: formatTopicDate(dateValue),
              category: (categoryValue ?? 'トピックス').toString().trim() || 'トピックス',
              tag: resolvedTag || undefined,
              title,
              isNew: resolvedIsNew,
            } as Topic;
          })
          .filter((topic): topic is Topic => topic !== null);

        if (mounted && parsedTopics.length > 0) {
          setTopics(parsedTopics);
        }
      } catch {
        // Keep fallback topics when Excel loading fails.
      }
    };

    void loadTopics();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full px-4 py-4 md:px-8 md:py-5 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-0.5 text-[10px] uppercase tracking-[0.24em] text-stone-400 notranslate" translate="no">Latest Updates</p>
            <h2 className="font-serif text-[1.2rem] text-stone-900 md:text-[1.35rem] notranslate" translate="no">Topics</h2>
          </div>
          <button className="inline-flex items-center gap-1 self-start text-[11px] font-medium tracking-[0.14em] text-stone-500 transition-colors hover:text-stone-900 md:self-auto">
            一覧を見る <ChevronRight size={13} className="transition-transform hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-2 space-y-1.5">
          {topics.slice(0, 5).map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="group cursor-pointer border-b border-stone-200/80 px-1 py-3 transition duration-200 hover:border-stone-300"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
                <div className="flex items-center gap-3 md:w-44 md:shrink-0">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-stone-400">{topic.date}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] ${getTagColorClass(topic.tag ?? topic.category)}`}>
                    {topic.tag ?? topic.category}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <p className="text-[13px] font-medium leading-5 text-stone-700 transition-colors group-hover:text-stone-950 md:text-[14px]">
                    {topic.title}
                    {topic.isNew && (
                      <span className="ml-2 inline-block text-[8px] font-bold italic tracking-[0.14em] text-rose-500">NEW</span>
                    )}
                  </p>
                  <ChevronRight size={14} className="shrink-0 text-stone-300 transition-all group-hover:translate-x-1 group-hover:text-stone-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const findColumnIndex = (headerRow: (string | number | Date | null)[], candidates: string[]): number => {
  const normalizedCandidates = candidates.map((candidate) => candidate.trim().toLowerCase());
  return headerRow.findIndex((header) => {
    const value = (header ?? '').toString().trim().toLowerCase();
    return normalizedCandidates.includes(value);
  });
};

const getTagCheckboxColumns = (
  headerRow: (string | number | Date | null)[]
): Array<{ index: number; tag: string }> => {
  return headerRow
    .map((header, index) => {
      const value = (header ?? '').toString().trim();
      if (!value.startsWith('タグ_')) {
        return null;
      }
      return {
        index,
        tag: value.replace(/^タグ_/, '').trim(),
      };
    })
    .filter((entry): entry is { index: number; tag: string } => entry !== null && entry.tag.length > 0);
};

const getCheckedTagFromColumns = (
  row: (string | number | Date | null)[],
  tagColumns: Array<{ index: number; tag: string }>
): string => {
  const checked = tagColumns.find((column) => parseIsNewValue(row[column.index]));
  return checked?.tag ?? '';
};

const parseIsNewValue = (value: string | number | Date | null | undefined): boolean => {
  if (typeof value === 'number') {
    return value !== 0;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return ['1', 'true', 'yes', 'y', 'new', '表示', 'on', 'あり', '〇', '○'].includes(normalized);
  }

  return false;
};

const getTagColorClass = (tag: string): string => {
  const normalizedTag = tag.trim();
  if (['お知らせ', 'ニュース', '新着'].includes(normalizedTag)) {
    return 'border-emerald-100 text-emerald-600 bg-emerald-50/50';
  }
  if (['キャンペーン', 'イベント', 'PR'].includes(normalizedTag)) {
    return 'border-amber-100 text-amber-600 bg-amber-50/50';
  }
  if (['重要', '注意'].includes(normalizedTag)) {
    return 'border-rose-100 text-rose-600 bg-rose-50/50';
  }
  return 'border-stone-100 text-stone-500 bg-stone-50/50';
};

const formatTopicDate = (value: string | number | Date | null | undefined): string => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return `${value.getFullYear()}.${String(value.getMonth() + 1).padStart(2, '0')}.${String(value.getDate()).padStart(2, '0')}`;
  }

  if (typeof value === 'number') {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed) {
      return `${parsed.y}.${String(parsed.m).padStart(2, '0')}.${String(parsed.d).padStart(2, '0')}`;
    }
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim().replaceAll('/', '.').replaceAll('-', '.');
  }

  return '';
};
