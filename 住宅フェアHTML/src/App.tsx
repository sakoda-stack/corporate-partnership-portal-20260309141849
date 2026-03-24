/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Wallet } from "lucide-react";
import kaijoImage from "../会場.jpeg";
import tenjiImage from "../展示.jpeg";
import tenjibutsuImage from "../展示物等.jpeg";
import boothImage from "../ブース設置.jpeg";

export default function App() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-stone-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif text-lg tracking-widest font-medium">LEBEN HOME BUILD</div>
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
            <a href="#summary" className="hover:text-stone-900 transition-colors">Summary</a>
            <a href="#gallery" className="hover:text-stone-900 transition-colors">Gallery</a>
            <a href="#overview" className="hover:text-stone-900 transition-colors">Overview</a>
            <a href="#insights" className="hover:text-stone-900 transition-colors">Insights</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Residential Fair Exhibition Hall" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_infinite_alternate]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div {...fadeIn} className="max-w-2xl">
            <span className="inline-block text-amber-500 text-[10px] uppercase tracking-[0.4em] mb-6 font-semibold">Event Report</span>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.2] mb-6">
              第１６回<br />住宅相談フェア
            </h1>
            <p className="text-amber-500 text-xs tracking-widest mb-8 font-medium">2026年3月20日（金）開催</p>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
              職域を起点とした住まいの接点づくりとして開催された本フェア。
              多くの来場者でにぎわう会場の中で、レーベンホームビルドにも確かな関心が寄せられ、
              今後の提携営業につながる反響を得る機会となりました。
            </p>
          </motion.div>
        </div>
      </section>

      {/* KPI Summary */}
      <section id="summary" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-stone-200 border border-stone-200 overflow-hidden rounded-sm">
            {[
              { label: "TOTAL来場数", value: "75", unit: "組", icon: Users },
              { label: "ブース来場数", value: "5", unit: "組", icon: CheckCircle2 },
              { label: "現在追客中", value: "1", unit: "組", icon: TrendingUp },
              { label: "来場者最高予算感", value: "1.0", unit: "億円", icon: Wallet },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 text-center"
              >
                <item.icon className="w-4 h-4 mx-auto mb-6 text-stone-400" />
                <div className="font-serif text-4xl text-stone-900 mb-2">
                  {item.value}<span className="text-sm ml-1 font-sans text-stone-500">{item.unit}</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-amber-600 text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">Analysis</span>
            <h2 className="font-serif text-3xl">来場結果と手応え</h2>
          </motion.div>
          <motion.div {...fadeIn} className="space-y-8 text-stone-700 leading-loose">
            <p>
              当日は会場全体で75組が来場し、その中でレーベンホームビルドブースには5組のお客様をお迎えしました。
              特筆すべきは、そのうち1組が現在も具体的な検討を進める「追客中」のステータスにあることです。
            </p>
            <p>
              来場者の予算帯は7,000万円から1億円と高価格帯に集中しており、
              一定以上の購入検討意欲と経済力を持つ層との接点が着実に形成されました。
              法人提携を通じた認知拡大、および質の高い接点づくりとしての有効性を再確認する結果となりました。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-600 text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">Visuals</span>
            <h2 className="font-serif text-3xl">会場風景</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div {...fadeIn} className="md:col-span-3 h-[500px] overflow-hidden group">
              <img 
                src={kaijoImage}
                alt="会場全体風景" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
            {[
              { url: tenjiImage, alt: "展示" },
              { url: tenjibutsuImage, alt: "展示物等" },
              { url: boothImage, alt: "ブース設置" },
            ].map((img, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="h-64 overflow-hidden group"
              >
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <motion.div {...fadeIn}>
              <h3 className="font-serif text-2xl mb-8 border-l-2 border-amber-600 pl-6">提携企業の例</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-stone-600">
                {["ソフトバンク", "日立", "NTT", "伊藤忠", "ソニー", "パナソニック", "富士通", "ベルス", "MUFG", "など"].map((name, i) => (
                  <div key={i} className="py-2 border-b border-stone-200">{name}</div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <h3 className="font-serif text-2xl mb-8 border-l-2 border-amber-600 pl-6">主な出展企業</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-stone-600">
                {["東京建物", "住友林業", "長谷工", "ダイワハウス", "三菱UFJ不動産販売", "大京", "ミサワホーム", "ヒノキヤグループ", "みずほ不動産販売", "など"].map((name, i) => (
                  <div key={i} className="py-2 border-b border-stone-200">{name}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">Strategic Insights</span>
            <h2 className="font-serif text-3xl">営業視点での示唆</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "高価格帯検討層へのアプローチ", desc: "予算感1億円前後の層と直接対話できる機会は貴重であり、職域提携ならではの「信頼感」がベースにあるため、深いヒアリングが可能です。" },
              { title: "告知施策の有効性", desc: "職域経由の事前告知が来場導線として機能しており、目的意識を持った来場者が多いため、商談化へのスピード感が期待できます。" },
              { title: "比較検討の場におけるプレゼンス", desc: "有力出展社が並ぶ中で参加することで、ブランドの認知獲得と、比較検討層へのダイレクトなアピールが同時に実現しています。" },
              { title: "継続的な関係構築の足がかり", desc: "単発のイベント成果に留まらず、今回の実績をフックに、今後の継続的な法人提携営業を強化する余地が十分にあります。" },
            ].map((insight, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="group p-8 border border-stone-800 hover:border-stone-700 transition-colors"
              >
                <div className="text-amber-500 font-serif text-xs mb-6">0{i + 1}</div>
                <h4 className="text-lg font-medium mb-4 group-hover:text-amber-500 transition-colors">{insight.title}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">{insight.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-40 text-center bg-stone-50">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 {...fadeIn} className="font-serif text-4xl mb-12 italic">
            接点は、次の商談へ。
          </motion.h2>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="text-stone-600 text-sm leading-loose space-y-8">
            <p>
              高予算帯来場者との接点づくりは、法人提携施策の有効性を示す好材料となりました。<br />
              追客中案件の進捗を含め、今後の商談化へ大きな期待が持てる結果です。
            </p>
            <div className="pt-8 border-t border-stone-200">
              <span className="text-amber-600 text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">Next Event</span>
              <p className="text-stone-900 text-lg font-serif">
                次回開催：2026年7月20日（月）
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-[10px] uppercase tracking-widest text-stone-400 mb-4">
            &copy; 2026 LEBEN HOME BUILD. All Rights Reserved.
          </div>
          <div className="text-[9px] text-stone-300">
            ※本ページは社内営業共有用レポートです。
          </div>
        </div>
      </footer>
    </div>
  );
}
