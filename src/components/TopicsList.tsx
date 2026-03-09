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
        const dateIndex = findColumnIndex(headerRow, ['予定', '日付', 'date']);
        const categoryIndex = findColumnIndex(headerRow, ['目的', 'カテゴリ', 'category']);
        const tagIndex = findColumnIndex(headerRow, ['タグ', 'tag']);
        const titleIndex = findColumnIndex(headerRow, ['トピック名', 'タイトル', 'title']);
        const isNewIndex = findColumnIndex(headerRow, ['new', 'isnew', 'new表示', '新着']);
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
    <section className="py-4 px-6 md:px-20 max-w-6xl">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="font-serif text-xl mb-0.5 notranslate" translate="no">Topics</h2>
          <p className="text-stone-400 text-[10px] tracking-widest uppercase notranslate" translate="no">Latest Updates</p>
        </div>
        <button className="text-stone-500 hover:text-stone-900 text-[10px] font-medium flex items-center gap-1 group transition-colors">
          一覧を見る <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="space-y-0 border-t border-stone-100">
        {topics.slice(0, 5).map((topic, index) => (
          <motion.div 
            key={topic.id} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group flex flex-col md:flex-row md:items-center py-2 border-b border-stone-50 hover:bg-stone-50/50 transition-colors px-4 -mx-4 rounded-md cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-0.5 md:mb-0 md:w-48 shrink-0">
              <span className="text-stone-400 font-mono text-[10px]">{topic.date}</span>
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full border tracking-wider uppercase font-bold ${getTagColorClass(topic.tag ?? topic.category)}`}>
                {topic.tag ?? topic.category}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-between">
              <p className="text-stone-700 group-hover:text-stone-950 transition-colors line-clamp-1 text-xs font-medium">
                {topic.title}
                {topic.isNew && (
                  <span className="ml-2 text-[8px] font-bold text-rose-500 italic">NEW</span>
                )}
              </p>
              <ChevronRight size={14} className="text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
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
    return ['1', 'true', 'yes', 'y', 'new', '表示', 'on', '有', 'あり', '〇', '○', '✓', '✔', '☑'].includes(normalized);
  }

  return false;
};

const getTagColorClass = (tag: string): string => {
  const normalizedTag = tag.trim();
  if (['提携開始', '新規契約', '契約'].includes(normalizedTag)) {
    return 'border-emerald-100 text-emerald-600 bg-emerald-50/50';
  }
  if (['営業向け案内', '来場誘致', 'ＰＲ活動・来場誘致', 'PR'].includes(normalizedTag)) {
    return 'border-amber-100 text-amber-600 bg-amber-50/50';
  }
  if (['重要', '緊急'].includes(normalizedTag)) {
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
    const text = value.trim().replaceAll('/', '.').replaceAll('-', '.');
    return text;
  }

  return '';
};
