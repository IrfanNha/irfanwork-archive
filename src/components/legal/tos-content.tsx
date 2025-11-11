"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe2 } from "lucide-react";
import { PERSONAL_INFO } from "@/constants/home";
import { Button } from "@/components/ui/button";

export function TosContent() {
  const email = PERSONAL_INFO.email;
  const [lang, setLang] = useState<"id" | "en">("id");
  const toggleLang = () => setLang(lang === "id" ? "en" : "id");

  // Parallax background effect
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 80]);

  const content = {
    id: {
      title: "Syarat & Ketentuan",
      updated: "Terakhir diperbarui",
      sections: [
        {
          title: "Pendahuluan",
          body: (
            <>
              Dokumen ini merupakan perjanjian elektronik antara pengguna dan{" "}
              <strong>{PERSONAL_INFO.name}</strong> (“Irfanwork Ltd.”, “kami”,
              atau “milik kami”) yang mengatur seluruh ketentuan penggunaan,
              hak, kewajiban, dan tanggung jawab atas produk dan layanan kami,
              termasuk situs utama, Shortlink, Quran App, dan Seamless Wallet
              (“Layanan”) sesuai dengan Undang-Undang No. 11 Tahun 2008 tentang
              Informasi dan Transaksi Elektronik (*UU ITE*), perubahan melalui
              UU No. 19 Tahun 2016 dan UU No. 1 Tahun 2024, Peraturan Pemerintah
              No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi
              Elektronik, serta ketentuan hukum terkait. Penggunaan Layanan ini
              mengikat Anda pada seluruh Syarat & Ketentuan serta kebijakan yang
              berlaku di Indonesia.
            </>
          ),
        },
        {
          title: "1. Penerimaan Ketentuan",
          body: "Dengan mengakses atau menggunakan Layanan kami, Anda menyatakan sepakat dan tunduk secara hukum pada seluruh Syarat & Ketentuan, termasuk perubahan yang diumumkan di kemudian hari. Persetujuan dilakukan secara elektronik dan sah menurut hukum berdasarkan Pasal 20 UU ITE. Jika Anda tidak menyetujui, harap hentikan penggunaan Layanan.",
        },
        {
          title: "2. Penggunaan yang Diperbolehkan dan Batasan",
          list: [
            "Menggunakan layanan hanya untuk tujuan yang sah, legal, dan sesuai hukum serta tidak bertentangan dengan peraturan perundang-undangan Indonesia.",
            "Tidak melakukan perbuatan melanggar hukum termasuk penyebaran konten terlarang, pelanggaran hak kekayaan intelektual, tindakan penipuan, spam, atau upaya akses ilegal ke sistem (Pasal 27, 28, 29, 30, 31 UU ITE).",
            "Tidak mengganggu, merusak, atau membahayakan sistem elektronik, infrastruktur, dan kenyamanan pengguna lain.",
            "Tidak melakukan eksploitasi, penyalahgunaan, atau tindakan yang melanggar keamanan sistem, privasi data, ataupun integritas layanan.",
            "Pengguna wajib bertindak itikad baik, jujur, dan bertanggung jawab selama berinteraksi atau menggunakan Layanan (Pasal 17 UU ITE, PP 71/2019).",
          ],
        },
        {
          title: "3. Kepemilikan & Hak Kekayaan Intelektual",
          body: "Seluruh konten, desain, kode, database, logo, merek dagang, dan aset digital di bawah IrfanWork dilindungi sepenuhnya oleh hak cipta dan hak kekayaan intelektual lainnya sesuai hukum Indonesia. Penggunaan, penggandaan, distribusi, modifikasi, reverse engineering, atau akses tanpa izin tertulis dari kami dilarang keras. Pelanggaran dapat dikenai sanksi administratif dan/atau pidana sesuai peraturan yang berlaku.",
        },
        {
          title: "4. Tanggung Jawab Pengguna dan Penyelenggara",
          list: [
            "IrfanWork menyelenggarakan sistem elektronik sesuai standar keamanan, kerahasiaan, dan integritas data sebagaimana disyaratkan UU ITE dan PP No. 71/2019.",
            "Setiap gangguan sistem, downtime server, atau pelanggaran oleh pihak ketiga akan ditangani sebaik mungkin namun IrfanWork tidak bertanggung jawab atas kerugian akibat kejadian di luar kendali wajar (force majeure).",
            "Pengguna bertanggung jawab atas seluruh aktivitas dan konten yang diunggah/diakses melalui akun masing-masing.",
            "IrfanWork berhak mengambil tindakan pemblokiran, penghapusan konten, atau suspensi akses jika terjadi penyalahgunaan, pelanggaran hukum, atau permintaan otoritas yang sah.",
            "Akses ke data pribadi, akun, maupun perubahan fitur harus mengikuti prosedur verifikasi dan ketentuan hukum Indonesia demi menjaga keamanan dan hak pengguna.",
          ],
        },
        {
          title: "5. Perlindungan Hak Pengguna",
          body: "Pengguna berhak atas perlindungan hak digital, privasi, dan data pribadi sesuai Pasal 26 UU ITE dan UU PDP. IrfanWork wajib memberikan informasi jelas, akses atas data, hak koreksi, pemilihan fitur, dan mekanisme pengaduan jika terjadi pelanggaran, serta menjamin akses perjanjian dan kebijakan dalam bahasa Indonesia yang mudah dipahami (Pasal 18A UU ITE terkait klausula baku).",
        },
        {
          title: "6. Pembatasan & Larangan",
          body: "Anda dilarang keras menggunakan Layanan untuk kegiatan ilegal, pelanggaran hak pihak ketiga (termasuk hak cipta dan privasi), penipuan, distribusi malware, spamming, maupun tindakan lain yang melanggar hukum dan norma Indonesia. Kami berhak melakukan pelaporan, pembatasan akses, penutupan akun, dan menerima permintaan otoritas berwenang sesuai prosedur hukum.",
        },
        {
          title: "7. Perubahan Syarat & Ketentuan",
          body: "Kami berhak mengubah, memperbarui, atau menambah ketentuan ini sewaktu-waktu, sesuai perkembangan hukum, teknologi, atau kebijakan internal. Setiap perubahan akan diumumkan melalui situs/web dan efektif segera setelah dipublikasikan. Penggunaan berkelanjutan berarti Anda menyetujui perubahan tersebut.",
        },
        {
          title: "8. Pelindungan Anak dan Pengguna Khusus",
          body: "Jika pengguna adalah anak di bawah 18 tahun, diperlukan persetujuan orang tua/wali untuk menggunakan layanan tertentu sesuai Pasal 16A UU ITE dan UU Perlindungan Anak. Pengelola layanan wajib menerapkan verifikasi usia, fitur perlindungan, dan mekanisme pelaporan penyalahgunaan sesuai hukum dan regulasi perlindungan anak.",
        },
        {
          title: "9. Hukum yang Berlaku dan Penyelesaian Sengketa",
          body: "Syarat & Ketentuan ini tunduk pada hukum Indonesia. Setiap sengketa akan diselesaikan terlebih dahulu secara musyawarah, atau melalui forum yang disepakati, pengadilan, arbitrase, atau alternatif penyelesaian sengketa lain di Indonesia sesuai Pasal 18 dan Pasal 21 UU ITE. Pilihan hukum dan forum di luar Indonesia dapat berlaku untuk penggunaan internasional jika diatur khusus dalam perjanjian terpisah.",
        },
        {
          title: "10. Kontak",
          body: (
            <>
              Untuk pertanyaan hukum, pengajuan komplain, pelaporan pelanggaran
              hak, atau klarifikasi Syarat & Ketentuan, silakan hubungi kami:{" "}
              <a
                href={`mailto:${email}`}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                {email}
              </a>
              . Kami akan menindaklanjuti permintaan Anda sesuai prosedur dan
              ketentuan hukum yang berlaku di Indonesia.
            </>
          ),
        },
      ],
      footer:
        "Dengan menggunakan layanan IrfanWork, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan dalam dokumen ini berdasarkan hukum Indonesia. Anda juga mendapatkan hak perlindungan hukum digital dan akses terhadap mekanisme penyelesaian sengketa yang adil.",
    },
    en: {
      title: "Terms of Service",
      updated: "Last Updated",
      sections: [
        {
          title: "Introduction",
          body: (
            <>
              This document is an electronic agreement between users and{" "}
              <strong>{PERSONAL_INFO.name}</strong> (“Irfanwork Ltd”, “we”, or
              “our”), governing all terms of use, rights, obligations, and
              responsibilities for our products and services, including the main
              website, Shortlink, Quran App, and Seamless Wallet (“Services”).
              By using our Services, you are bound by all Terms and Conditions
              based on Law No. 11 of 2008 on Electronic Information and
              Transactions (ITE Law), its amendments (Law No. 19/2016, Law No.
              1/2024), Government Regulation No. 71 of 2019, and other
              applicable legal standards in Indonesia.
            </>
          ),
        },
        {
          title: "1. Acceptance of Terms",
          body: "By accessing or using our Services, you agree to all Terms and Conditions, including future changes. Electronic consent is legally valid under Article 20 of the ITE Law. If you disagree, please discontinue use.",
        },
        {
          title: "2. Permitted Use and Restrictions",
          list: [
            "Use services solely for lawful, legal, and compliant purposes, not contrary to Indonesian regulations.",
            "Do not engage in illegal acts including prohibited content, intellectual property infringement, fraud, spam, or unauthorized system access (Articles 27, 28, 29, 30, 31 of ITE Law).",
            "Do not disrupt, damage, or interfere with electronic systems, infrastructure, or the comfort of other users.",
            "Do not exploit, misuse, breach system security, privacy, or service integrity.",
            "Users must act in good faith, honestly, and responsibly when interacting or using the Services (Article 17 ITE Law, PP 71/2019).",
          ],
        },
        {
          title: "3. Ownership & Intellectual Property",
          body: "All content, design, code, databases, logos, trademarks, and digital assets under IrfanWork are fully protected by copyright and intellectual property rights under Indonesian law. Unauthorized use, duplication, distribution, modification, reverse engineering, or access is strictly prohibited. Violations may lead to administrative and/or criminal sanctions.",
        },
        {
          title: "4. User & Provider Responsibility",
          list: [
            "IrfanWork operates electronic systems with security, confidentiality, and data integrity standards as required by the ITE Law and PP No. 71/2019.",
            "System interruptions, server downtime, or third-party breaches will be handled as best as possible, but IrfanWork is not liable for losses due to force majeure or beyond reasonable control.",
            "Users are responsible for all activities and content uploaded/accessed through their own accounts.",
            "IrfanWork reserves the right to block, delete content, or suspend access in case of misuse, violations, or valid authority requests.",
            "Access to personal data, accounts, or feature changes must follow verification procedures and legal provisions to ensure user security and rights.",
          ],
        },
        {
          title: "5. User Rights Protection",
          body: "Users have rights to digital protection, privacy, and personal data as per Article 26 ITE Law and PDP Law. IrfanWork must provide clear information, data access, correction rights, feature selection, complaint mechanisms, and agreements in easy-to-understand Indonesian (Article 18A ITE Law on standard clauses).",
        },
        {
          title: "6. Prohibited Uses & Restrictions",
          body: "You are strictly prohibited from using the Services for illegal activities, rights infringement (including copyright and privacy), fraud, malware distribution, spamming, or any acts violating Indonesian laws or norms. We reserve the right to report, restrict access, terminate accounts, and comply with lawful authority requests.",
        },
        {
          title: "7. Changes to Terms",
          body: "We reserve the right to update, revise, or add to these Terms at any time according to legal, technological, or policy developments. Changes will be posted on the website and become effective upon publication. Continued use implies acceptance of changes.",
        },
        {
          title: "8. Child and Special User Protection",
          body: "If the user is under 18, parental or guardian consent is required for certain services (Article 16A ITE Law and Child Protection Laws). The provider must apply age verification, protections, and complaint mechanisms as regulated.",
        },
        {
          title: "9. Governing Law & Dispute Resolution",
          body: "These Terms are governed by Indonesian law. Any disputes will first be settled by deliberation, or through agreed forums, courts, arbitration, or alternative dispute resolution in Indonesia as per Article 18 and 21 ITE Law. For international use, alternative law and forums may apply under separate agreements.",
        },
        {
          title: "10. Contact",
          body: (
            <>
              For legal questions, complaints, reporting rights violations, or
              clarification of Terms & Conditions, please contact:{" "}
              <a
                href={`mailto:${email}`}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                {email}
              </a>
              . We will process your request according to procedures and
              applicable Indonesian law.
            </>
          ),
        },
      ],
      footer:
        "By using IrfanWork services, you confirm that you have read, understood, and accepted all terms in this document, based on Indonesian law. You also receive digital legal protection and access to fair dispute resolution.",
    },
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-background text-foreground">
      {/* subtle parallax glow */}
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(120,120,255,0.06),transparent_70%)]"
        style={{ y: parallaxY }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[28rem] sm:w-[36rem] md:w-[40rem] h-[28rem] sm:h-[36rem] md:h-[40rem] rounded-full bg-[rgba(150,150,255,0.08)] blur-3xl -z-10"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* language switcher */}
        <div className="flex justify-end mb-8">
          <Button
            onClick={toggleLang}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Globe2 className="w-4 h-4" />
            {lang === "id" ? "English" : "Bahasa Indonesia"}
          </Button>
        </div>

        {/* header */}
        <motion.header
          initial="hidden"
          animate="visible"
          className="text-center mb-14 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {content[lang].title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
            Terms of Service / Syarat & Ketentuan
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {content[lang].updated}: {new Date().toLocaleDateString("id-ID")}
          </p>
        </motion.header>

        {/* sections */}
        <div className="space-y-10 sm:space-y-12">
          {content[lang].sections.map((section, i) => (
            <motion.section
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-3 sm:space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-semibold leading-snug">
                {section.title}
              </h2>
              {section.body && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              )}
              {section.list && (
                <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground leading-relaxed space-y-1 sm:space-y-1.5">
                  {section.list.map((item, j) => (
                    <motion.li key={j}>{item}</motion.li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* footer note */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          className="text-xs sm:text-sm text-muted-foreground text-center mt-16 sm:mt-20 italic"
        >
          {content[lang].footer}
        </motion.p>
      </div>
    </section>
  );
}
