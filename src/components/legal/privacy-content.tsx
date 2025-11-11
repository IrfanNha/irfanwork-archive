"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/constants/home";
import { Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrivacyContent() {
  const email = PERSONAL_INFO.email;
  const [lang, setLang] = useState<"id" | "en">("id");
  const toggleLang = () => setLang(lang === "id" ? "en" : "id");

  const content = {
    id: {
      title: "Kebijakan Privasi",
      updated: "Terakhir diperbarui",
      sections: [
        {
          title: "Pendahuluan",
          body: (
            <>
              Selamat datang di <strong>{PERSONAL_INFO.name} </strong>{" "}
              &quot;Irfanwork Ltd.&quot;, &quot;kami&quot;, atau &quot;milik
              kami&quot;. Kami menghormati privasi Anda dan berkomitmen
              melindungi data pribadi Anda sesuai dengan Undang-Undang Nomor 27
              Tahun 2022 tentang Pelindungan Data Pribadi (&quot;UU PDP&quot;),
              Peraturan Menteri Komunikasi dan Informatika Nomor 20 Tahun 2016
              tentang Perlindungan Data Pribadi Dalam Sistem Elektronik,
              Peraturan Pemerintah Nomor 71 Tahun 2019 tentang Penyelenggaraan
              Sistem dan Transaksi Elektronik, serta peraturan
              perundang-undangan terkait lainnya yang berlaku di Indonesia.
              Kebijakan Privasi ini menjelaskan bagaimana kami sebagai
              Pengendali Data Pribadi mengumpulkan, memproses, menggunakan,
              menyimpan, mengungkapkan, dan melindungi informasi pribadi Anda di
              seluruh produk dan layanan kami, termasuk situs web utama, layanan
              shortlink, aplikasi Quran, dan Seamless Wallet.
            </>
          ),
        },
        {
          title: "Ruang Lingkup dan Yurisdiksi",
          body: "Kebijakan Privasi ini berlaku untuk seluruh pengguna layanan kami baik yang berada di dalam maupun di luar wilayah hukum Republik Indonesia, sepanjang pemrosesan data pribadi tersebut memiliki akibat hukum di wilayah Indonesia. Kebijakan ini mencakup seluruh tahapan pemrosesan data pribadi sebagaimana diatur dalam Pasal 16 UU PDP, meliputi perolehan, pengumpulan, pengolahan, penganalisisan, penyimpanan, perbaikan, pembaruan, penampilan, pengumuman, transfer, penyebarluasan, pengungkapan, penghapusan, dan pemusnahan data pribadi. Beberapa produk atau layanan tertentu dapat memiliki ketentuan privasi tambahan yang bersifat melengkapi kebijakan ini.",
        },
        {
          title: "Definisi",
          body: "Data Pribadi adalah data tentang orang perseorangan yang teridentifikasi atau dapat diidentifikasi secara tersendiri atau dikombinasi dengan informasi lainnya, baik secara langsung maupun tidak langsung melalui sistem elektronik atau nonelektronik. Pemrosesan Data Pribadi adalah setiap kegiatan atau serangkaian kegiatan yang dilakukan terhadap data pribadi secara elektronik atau nonelektronik. Subjek Data Pribadi adalah orang perseorangan yang melekat pada data pribadi. Pengendali Data Pribadi adalah setiap orang, badan publik, dan organisasi internasional yang bertindak sendiri-sendiri atau bersama-sama dalam menentukan tujuan dan melakukan kendali pemrosesan data pribadi.",
        },
        {
          title: "Jenis Data Pribadi yang Kami Kumpulkan",
          body: "Kami mengumpulkan dan memproses data pribadi sesuai dengan klasifikasi dalam Pasal 4 UU PDP, yang terdiri dari:",
          list: [
            "Data Pribadi Bersifat Umum: nama lengkap, jenis kelamin, kewarganegaraan, agama, status perkawinan, alamat email, nomor telepon, dan data pribadi lain yang dikombinasikan untuk mengidentifikasi seseorang.",
            "Data Pribadi Bersifat Spesifik (jika berlaku untuk layanan tertentu): data kesehatan, data biometrik, data genetika, catatan kejahatan, data anak, data keuangan pribadi, dan data lainnya sesuai ketentuan peraturan perundang-undangan.",
            "Data Teknis: alamat IP (Internet Protocol), jenis dan versi peramban (browser), tipe perangkat, sistem operasi, pengaturan zona waktu, log aktivitas sistem, informasi cookies dan teknologi pelacakan serupa.",
            "Data yang Anda Berikan Secara Langsung: informasi yang Anda sampaikan melalui formulir pendaftaran, formulir kontak, survei, atau komunikasi lainnya dengan kami.",
          ],
        },
        {
          title: "Dasar Hukum Pemrosesan Data Pribadi",
          body: "Sesuai dengan Pasal 20 dan Pasal 21 UU PDP, kami memproses data pribadi Anda berdasarkan dasar hukum yang sah, yaitu:",
          list: [
            "Persetujuan yang Sah: Kami memperoleh persetujuan eksplisit dari Anda sebelum memproses data pribadi, yang diberikan secara sukarela, spesifik, terinformasi, dan tidak ambigu. Persetujuan ini dapat diberikan secara tertulis atau elektronik yang terekam.",
            "Pemenuhan Kewajiban Perjanjian: Pemrosesan diperlukan untuk melaksanakan perjanjian layanan antara Anda dengan kami atau untuk memenuhi permintaan Anda sebelum memasuki perjanjian.",
            "Pemenuhan Kewajiban Hukum: Pemrosesan diperlukan untuk mematuhi kewajiban hukum yang diatur dalam peraturan perundang-undangan yang berlaku.",
            "Kepentingan Vital: Pemrosesan diperlukan untuk melindungi kepentingan vital Subjek Data Pribadi atau orang lain.",
            "Kepentingan yang Sah: Pemrosesan berdasarkan kepentingan yang sah dari Pengendali Data Pribadi dengan tetap memperhatikan tujuan, kebutuhan, dan keseimbangan antara kepentingan Pengendali Data Pribadi dan hak-hak Subjek Data Pribadi.",
          ],
        },
        {
          title: "Tujuan Penggunaan Data Pribadi",
          body: "Kami menggunakan data pribadi Anda untuk tujuan yang terbatas, relevan, dan sesuai dengan prinsip pembatasan tujuan sebagaimana diatur dalam UU PDP, yaitu:",
          list: [
            "Menyediakan, mengoperasikan, memelihara, dan meningkatkan kualitas layanan dan produk kami.",
            "Memproses pendaftaran akun, autentikasi pengguna, dan manajemen akses layanan.",
            "Menganalisis perilaku dan preferensi pengguna untuk keperluan optimisasi produk, personalisasi konten, dan peningkatan pengalaman pengguna.",
            "Menangani permintaan dukungan pelanggan, menyediakan layanan bantuan teknis, dan merespons pertanyaan atau keluhan Anda.",
            "Mengirimkan pemberitahuan penting terkait layanan, pembaruan kebijakan, informasi keamanan, dan komunikasi administratif lainnya.",
            "Melakukan analisis statistik, riset pasar, dan pengembangan produk baru untuk memahami kebutuhan pengguna.",
            "Mencegah, mendeteksi, dan menangani aktivitas penipuan, penyalahgunaan, pelanggaran keamanan, atau aktivitas ilegal lainnya.",
            "Mematuhi kewajiban hukum, merespons permintaan dari otoritas berwenang, dan melaksanakan proses hukum yang sah.",
          ],
        },
        {
          title: "Penggunaan Cookies dan Teknologi Pelacakan",
          body: "Kami menggunakan cookies, penyimpanan lokal (local storage), dan teknologi pelacakan serupa untuk mengumpulkan data teknis dan preferensi pengguna. Cookies adalah file teks kecil yang disimpan pada perangkat Anda untuk mengingat preferensi, meningkatkan kinerja layanan, dan menganalisis pola penggunaan. Penggunaan cookies ini termasuk dalam pemrosesan data pribadi sebagaimana diatur dalam UU PDP. Kami menggunakan jenis cookies berikut: (1) Cookies Esensial yang diperlukan untuk fungsi dasar layanan; (2) Cookies Analitik untuk memahami bagaimana pengguna berinteraksi dengan layanan kami; (3) Cookies Fungsional untuk mengingat pilihan dan preferensi Anda; dan (4) Cookies Pemasaran (jika berlaku) untuk menyajikan konten yang relevan. Anda dapat mengelola atau menonaktifkan cookies melalui pengaturan peramban Anda, namun hal ini dapat mempengaruhi fungsionalitas layanan. Dengan terus menggunakan layanan kami, Anda memberikan persetujuan terhadap penggunaan cookies sebagaimana dijelaskan dalam kebijakan ini.",
        },
        {
          title: "Pengungkapan dan Transfer Data Pribadi",
          body: "Kami tidak akan menjual, menyewakan, atau menukar data pribadi Anda kepada pihak ketiga untuk tujuan komersial. Namun, kami dapat mengungkapkan data pribadi Anda dalam situasi berikut dengan tetap menjaga prinsip perlindungan data:",
          list: [
            "Kepada Prosesor Data Pribadi: Kami dapat menggunakan penyedia layanan pihak ketiga (prosesor) untuk membantu operasional layanan kami, seperti penyedia hosting, layanan analitik, atau penyedia infrastruktur teknologi. Prosesor tersebut hanya diizinkan memproses data sesuai instruksi kami dan wajib menjaga kerahasiaan serta keamanan data.",
            "Kewajiban Hukum: Kami akan mengungkapkan data pribadi jika diwajibkan oleh hukum, perintah pengadilan, proses hukum, atau permintaan dari otoritas pemerintah yang berwenang.",
            "Transfer Data Lintas Negara: Jika terjadi transfer data pribadi ke luar wilayah hukum Republik Indonesia, kami akan memastikan bahwa: (a) negara tujuan memiliki tingkat pelindungan data pribadi yang setara atau lebih tinggi dari Indonesia sebagaimana diatur dalam Pasal 56 UU PDP; (b) terdapat perjanjian internasional atau pelindungan data pribadi yang memadai dan mengikat; atau (c) kami telah memperoleh persetujuan eksplisit dari Anda. Kami akan melakukan koordinasi dengan Kementerian Komunikasi dan Digital sebelum melakukan transfer data sesuai dengan ketentuan yang berlaku.",
            "Perlindungan Hak dan Keamanan: Untuk melindungi hak, properti, atau keselamanan kami, pengguna kami, atau publik, sejauh diizinkan atau diwajibkan oleh hukum.",
          ],
        },
        {
          title: "Keamanan Data Pribadi",
          body: "Kami menerapkan langkah-langkah keamanan teknis, administratif, dan organisatoris yang sesuai dengan standar industri untuk melindungi data pribadi Anda dari kehilangan, penyalahgunaan, akses tidak sah, pengungkapan, pengubahan, atau pemusnahan yang tidak sah. Langkah-langkah keamanan tersebut mencakup: enkripsi data dalam transmisi dan penyimpanan, kontrol akses berbasis peran (role-based access control), sistem autentikasi yang aman, firewall dan sistem deteksi intrusi, pemantauan keamanan secara berkala, dan audit keamanan rutin. Meskipun kami telah mengambil langkah-langkah yang wajar untuk melindungi data Anda, perlu diketahui bahwa tidak ada metode transmisi data melalui internet atau metode penyimpanan elektronik yang 100% aman. Dalam hal terjadi kegagalan pelindungan data pribadi atau insiden kebocoran data, kami akan: (1) melakukan pemberitahuan tertulis kepada Anda dan Lembaga Pelindungan Data Pribadi paling lambat 3 x 24 (tiga kali dua puluh empat) jam sejak mengetahui terjadinya kegagalan tersebut sebagaimana diatur dalam Pasal 46 UU PDP; (2) memberikan informasi mengenai data pribadi yang terungkap, waktu dan penyebab kegagalan, serta upaya penanganan dan pemulihan yang dilakukan; (3) melakukan investigasi menyeluruh untuk mengidentifikasi penyebab dan mencegah insiden serupa di masa depan. Kami akan bertindak dengan itikad baik dan sesuai dengan ketentuan hukum yang berlaku dalam menangani setiap insiden keamanan data.",
        },
        {
          title: "Penyimpanan dan Retensi Data",
          body: "Kami menyimpan data pribadi Anda hanya selama diperlukan untuk memenuhi tujuan pemrosesan sebagaimana dijelaskan dalam kebijakan ini, atau selama diwajibkan oleh peraturan perundang-undangan yang berlaku. Setelah masa retensi berakhir atau berdasarkan permintaan Anda, kami akan menghapus atau memusnahkan data pribadi Anda secara aman sesuai dengan prosedur yang berlaku, kecuali diwajibkan untuk menyimpannya lebih lama berdasarkan peraturan perundang-undangan atau untuk kepentingan hukum yang sah. Kami menerapkan kebijakan retensi data yang jelas dan terdokumentasi untuk memastikan data tidak disimpan lebih lama dari yang diperlukan.",
        },
        {
          title: "Hak Anda sebagai Subjek Data Pribadi",
          body: "Sesuai dengan Pasal 5 hingga Pasal 13 UU PDP, Anda memiliki hak-hak berikut terkait data pribadi Anda:",
          list: [
            "Hak atas Informasi: Anda berhak mendapatkan informasi yang jelas tentang kejelasan identitas kami, dasar kepentingan hukum pemrosesan, tujuan permintaan dan penggunaan data pribadi, serta akuntabilitas pihak yang meminta data pribadi.",
            "Hak untuk Melengkapi Data: Anda berhak melengkapi data pribadi Anda sebelum diproses oleh kami.",
            "Hak Akses dan Salinan: Anda berhak mengakses dan memperoleh salinan data pribadi Anda yang kami kuasai sesuai dengan ketentuan peraturan perundang-undangan. Hak ini dapat dilaksanakan tanpa biaya, kecuali untuk kondisi tertentu yang memerlukan biaya administrasi.",
            "Hak Pembaruan dan Perbaikan: Anda berhak memperbarui dan/atau memperbaiki kesalahan atau ketidakakuratan data pribadi Anda sesuai dengan tujuan pemrosesan. Kami akan melakukan pembaruan paling lambat 3 x 24 (tiga kali dua puluh empat) jam sejak permintaan diterima.",
            "Hak Penghapusan dan Pemusnahan: Anda berhak untuk mengakhiri pemrosesan, menghapus, dan/atau memusnahkan data pribadi Anda sesuai dengan ketentuan peraturan perundang-undangan.",
            "Hak Penarikan Persetujuan: Anda berhak menarik kembali persetujuan pemrosesan data pribadi yang telah Anda berikan kepada kami. Penarikan persetujuan tidak mempengaruhi keabsahan pemrosesan yang telah dilakukan sebelum penarikan.",
            "Hak Penundaan dan Pembatasan: Anda berhak meminta penundaan atau pembatasan pemrosesan data pribadi Anda dalam kondisi tertentu.",
            "Hak Mengajukan Keberatan: Anda berhak mengajukan keberatan atas pemrosesan data pribadi yang dilakukan berdasarkan kepentingan yang sah atau untuk keperluan pengambilan keputusan secara otomatis.",
            "Hak Portabilitas Data: Anda berhak meminta kami untuk memindahkan data pribadi Anda ke Pengendali Data Pribadi lain dalam bentuk elektronik sesuai dengan ketentuan UU PDP.",
            "Hak Mengajukan Pengaduan dan Ganti Rugi: Anda berhak mengajukan pengaduan kepada Lembaga Pelindungan Data Pribadi atas dugaan pelanggaran, serta menggugat dan menerima ganti rugi atas pelanggaran pemrosesan data pribadi sesuai dengan ketentuan peraturan perundang-undangan.",
          ],
        },
        {
          title: "Cara Menggunakan Hak Anda",
          body: (
            <>
              Untuk melaksanakan hak-hak Anda sebagai Subjek Data Pribadi
              sebagaimana dijelaskan di atas, Anda dapat menghubungi kami
              melalui email yang tertera di bagian Kontak di bawah ini. Kami
              akan memverifikasi identitas Anda terlebih dahulu untuk memastikan
              keamanan data pribadi. Setelah verifikasi, kami akan merespons
              permintaan Anda dalam batas waktu yang ditentukan oleh peraturan
              perundang-undangan yang berlaku. Perlu diketahui bahwa dalam
              kondisi tertentu, kami dapat menolak permintaan Anda jika
              diharuskan atau diperkenankan oleh hukum, atau jika permintaan
              tersebut tidak dapat dilaksanakan secara teknis atau hukum. Kami
              dapat membebankan biaya administrasi yang wajar untuk permintaan
              tertentu sesuai dengan ketentuan yang berlaku.
            </>
          ),
        },
        {
          title: "Data Pribadi Anak",
          body: "Layanan kami pada umumnya tidak ditujukan kepada anak-anak di bawah usia 18 tahun. Jika pemrosesan data pribadi anak diperlukan untuk layanan tertentu, kami akan memperoleh persetujuan dari orang tua atau wali yang sah sesuai dengan Pasal 21 ayat (2) UU PDP. Jika kami mengetahui bahwa kami telah mengumpulkan data pribadi anak tanpa persetujuan yang sah, kami akan mengambil langkah-langkah untuk menghapus data tersebut sesegera mungkin.",
        },
        {
          title: "Perubahan Kebijakan Privasi",
          body: "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami, layanan, atau peraturan perundang-undangan yang berlaku. Setiap perubahan material akan diberitahukan kepada Anda melalui email, pemberitahuan pada layanan, atau dengan cara lain yang sesuai. Tanggal 'Terakhir diperbarui' di bagian atas kebijakan ini akan menunjukkan kapan perubahan terakhir dilakukan. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala untuk tetap mengetahui bagaimana kami melindungi data pribadi Anda. Penggunaan layanan kami setelah perubahan kebijakan berarti Anda menerima kebijakan yang telah diperbarui.",
        },
        {
          title: "Kontak dan Pengendali Data Pribadi",
          body: (
            <>
              Pengendali Data Pribadi untuk layanan ini adalah{" "}
              <strong>{PERSONAL_INFO.name}</strong> dengan kedudukan di wilayah
              hukum Republik Indonesia. Jika Anda memiliki pertanyaan,
              kekhawatiran, atau permintaan terkait Kebijakan Privasi ini atau
              pemrosesan data pribadi Anda, atau jika Anda ingin melaksanakan
              hak-hak Anda sebagai Subjek Data Pribadi, silakan hubungi kami
              melalui:{" "}
              <a
                href={`mailto:${email}`}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                {email}
              </a>
              . Kami akan merespons pertanyaan atau permintaan Anda dalam waktu
              yang wajar dan sesuai dengan ketentuan peraturan
              perundang-undangan yang berlaku. Untuk pengaduan terkait dugaan
              pelanggaran pelindungan data pribadi, Anda juga dapat menghubungi
              Lembaga Pelindungan Data Pribadi yang dibentuk berdasarkan Pasal
              58 UU PDP setelah lembaga tersebut resmi beroperasi.
            </>
          ),
        },
      ],
      footer:
        "Dengan menggunakan layanan kami, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui pengumpulan, pemrosesan, penggunaan, pengungkapan, penyimpanan, dan perlindungan data pribadi Anda sebagaimana diuraikan dalam Kebijakan Privasi ini sesuai dengan Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi dan peraturan perundang-undangan terkait lainnya yang berlaku di Republik Indonesia.",
    },
    en: {
      title: "Privacy Policy",
      updated: "Last Updated",
      sections: [
        {
          title: "Introduction",
          body: (
            <>
              Welcome to <strong>{PERSONAL_INFO.name}</strong> (&quot;Irfanwork
              Ltd.&quot;, &quot;we&quot;, or &quot;our&quot;). We value your
              privacy and are committed to protecting your personal data in
              accordance with Indonesian Law No. 27 of 2022 on Personal Data
              Protection (&quot;PDP Law&quot;), Regulation of the Minister of
              Communication and Informatics No. 20 of 2016 on Personal Data
              Protection in Electronic Systems, Government Regulation No. 71 of
              2019 on Implementation of Electronic Systems and Transactions, and
              other applicable regulations in Indonesia. This Privacy Policy
              describes how we, as the Personal Data Controller, collect,
              process, use, store, disclose, and protect your personal
              information across our products and services — including our main
              website, shortlink service, Quran app, and Seamless Wallet.
            </>
          ),
        },
        {
          title: "Scope and Jurisdiction",
          body: "This Privacy Policy applies to all users of our services, whether located within or outside the legal territory of the Republic of Indonesia, insofar as the processing of such personal data has legal effects in Indonesia. This policy covers all stages of personal data processing as regulated in Article 16 of the PDP Law, including obtaining, collecting, processing, analyzing, storing, correcting, updating, displaying, announcing, transferring, disseminating, disclosing, erasing, and destroying personal data. Certain products or services may have additional privacy terms that supplement this policy.",
        },
        {
          title: "Definitions",
          body: "Personal Data means data about an individual who is identified or identifiable, either separately or combined with other information, directly or indirectly through electronic or non-electronic systems. Personal Data Processing means any activity or series of activities performed on personal data electronically or non-electronically. Personal Data Subject means an individual to whom personal data relates. Personal Data Controller means any person, public body, and international organization acting individually or jointly in determining the purpose and exercising control over personal data processing.",
        },
        {
          title: "Types of Personal Data We Collect",
          body: "We collect and process personal data in accordance with the classification in Article 4 of the PDP Law, consisting of:",
          list: [
            "General Personal Data: full name, gender, nationality, religion, marital status, email address, phone number, and other personal data combined to identify a person.",
            "Specific Personal Data (if applicable to certain services): health data, biometric data, genetic data, criminal records, children's data, personal financial data, and other data as stipulated by laws and regulations.",
            "Technical Data: IP (Internet Protocol) address, browser type and version, device type, operating system, time zone settings, system activity logs, cookies and similar tracking technology information.",
            "Data You Provide Directly: information you submit through registration forms, contact forms, surveys, or other communications with us.",
          ],
        },
        {
          title: "Legal Basis for Personal Data Processing",
          body: "In accordance with Articles 20 and 21 of the PDP Law, we process your personal data based on lawful grounds, namely:",
          list: [
            "Lawful Consent: We obtain your explicit consent before processing personal data, given voluntarily, specifically, informedly, and unambiguously. This consent can be provided in writing or electronically on record.",
            "Contractual Obligation: Processing is necessary to perform a service agreement between you and us or to fulfill your request before entering into an agreement.",
            "Legal Obligation: Processing is necessary to comply with legal obligations stipulated in applicable laws and regulations.",
            "Vital Interests: Processing is necessary to protect the vital interests of the Personal Data Subject or others.",
            "Legitimate Interests: Processing based on the legitimate interests of the Personal Data Controller while considering the purpose, necessity, and balance between the interests of the Personal Data Controller and the rights of the Personal Data Subject.",
          ],
        },
        {
          title: "Purposes of Personal Data Use",
          body: "We use your personal data for limited, relevant purposes in accordance with the principle of purpose limitation as regulated in the PDP Law, namely:",
          list: [
            "To provide, operate, maintain, and improve the quality of our services and products.",
            "To process account registration, user authentication, and service access management.",
            "To analyze user behavior and preferences for product optimization, content personalization, and user experience enhancement.",
            "To handle customer support requests, provide technical assistance, and respond to your inquiries or complaints.",
            "To send important service notifications, policy updates, security information, and other administrative communications.",
            "To conduct statistical analysis, market research, and new product development to understand user needs.",
            "To prevent, detect, and address fraud, abuse, security breaches, or other illegal activities.",
            "To comply with legal obligations, respond to requests from competent authorities, and implement lawful legal processes.",
          ],
        },
        {
          title: "Use of Cookies and Tracking Technologies",
          body: "We use cookies, local storage, and similar tracking technologies to collect technical data and user preferences. Cookies are small text files stored on your device to remember preferences, improve service performance, and analyze usage patterns. The use of cookies constitutes personal data processing as regulated in the PDP Law. We use the following types of cookies: (1) Essential Cookies required for basic service functions; (2) Analytical Cookies to understand how users interact with our services; (3) Functional Cookies to remember your choices and preferences; and (4) Marketing Cookies (if applicable) to deliver relevant content. You can manage or disable cookies through your browser settings, but this may affect service functionality. By continuing to use our services, you consent to the use of cookies as described in this policy.",
        },
        {
          title: "Disclosure and Transfer of Personal Data",
          body: "We will not sell, rent, or exchange your personal data to third parties for commercial purposes. However, we may disclose your personal data in the following situations while maintaining data protection principles:",
          list: [
            "To Personal Data Processors: We may use third-party service providers (processors) to assist our service operations, such as hosting providers, analytics services, or technology infrastructure providers. Such processors are only authorized to process data according to our instructions and are obligated to maintain confidentiality and data security.",
            "Legal Obligations: We will disclose personal data if required by law, court order, legal process, or request from competent government authorities.",
            "Cross-Border Data Transfer: If personal data is transferred outside the legal territory of the Republic of Indonesia, we will ensure that: (a) the destination country has a level of personal data protection equivalent to or higher than Indonesia as regulated in Article 56 of the PDP Law; (b) there is an international agreement or adequate and binding personal data protection; or (c) we have obtained your explicit consent. We will coordinate with the Ministry of Communication and Digital Affairs before conducting data transfer in accordance with applicable regulations.",
            "Protection of Rights and Security: To protect our rights, property, or safety, our users, or the public, to the extent permitted or required by law.",
          ],
        },
        {
          title: "Personal Data Security",
          body: "We implement technical, administrative, and organizational security measures appropriate to industry standards to protect your personal data from loss, misuse, unauthorized access, disclosure, alteration, or unauthorized destruction. These security measures include: data encryption in transmission and storage, role-based access control, secure authentication systems, firewalls and intrusion detection systems, regular security monitoring, and routine security audits. Although we have taken reasonable steps to protect your data, please note that no method of data transmission over the internet or electronic storage method is 100% secure. In the event of a personal data protection failure or data breach incident, we will: (1) provide written notification to you and the Personal Data Protection Agency no later than 3 x 24 (three times twenty-four) hours after becoming aware of the failure as regulated in Article 46 of the PDP Law; (2) provide information regarding the personal data disclosed, the time and cause of the failure, and the handling and recovery measures taken; (3) conduct a thorough investigation to identify the cause and prevent similar incidents in the future. We will act in good faith and in accordance with applicable legal provisions in handling any data security incidents.",
        },
        {
          title: "Data Storage and Retention",
          body: "We retain your personal data only for as long as necessary to fulfill the processing purposes described in this policy, or as required by applicable laws and regulations. After the retention period expires or upon your request, we will securely delete or destroy your personal data in accordance with applicable procedures, unless we are required to retain it longer based on laws and regulations or for legitimate legal interests. We implement clear and documented data retention policies to ensure data is not kept longer than necessary.",
        },
        {
          title: "Your Rights as Personal Data Subject",
          body: "In accordance with Articles 5 to 13 of the PDP Law, you have the following rights regarding your personal data:",
          list: [
            "Right to Information: You have the right to obtain clear information about our identity, the legal basis for processing, the purpose of requesting and using personal data, and the accountability of the party requesting personal data.",
            "Right to Complete Data: You have the right to complete your personal data before it is processed by us.",
            "Right of Access and Copy: You have the right to access and obtain a copy of your personal data that we control in accordance with laws and regulations. This right can be exercised free of charge, except for certain conditions requiring administrative fees.",
            "Right to Update and Correction: You have the right to update and/or correct errors or inaccuracies in your personal data in accordance with processing purposes. We will perform updates no later than 3 x 24 (three times twenty-four) hours after the request is received.",
            "Right to Erasure and Destruction: You have the right to terminate processing, erase, and/or destroy your personal data in accordance with laws and regulations.",
            "Right to Withdraw Consent: You have the right to withdraw the consent for personal data processing that you have given to us. Withdrawal of consent does not affect the validity of processing already conducted before withdrawal.",
            "Right to Suspension and Restriction: You have the right to request suspension or restriction of your personal data processing under certain conditions.",
            "Right to Object: You have the right to object to personal data processing conducted based on legitimate interests or for automated decision-making purposes.",
            "Right to Data Portability: You have the right to request us to transfer your personal data to another Personal Data Controller in electronic form in accordance with the PDP Law.",
            "Right to Lodge Complaints and Compensation: You have the right to lodge complaints with the Personal Data Protection Agency regarding alleged violations, as well as to sue and receive compensation for violations of personal data processing in accordance with laws and regulations.",
          ],
        },
        {
          title: "How to Exercise Your Rights",
          body: (
            <>
              To exercise your rights as a Personal Data Subject as described
              above, you may contact us via the email provided in the Contact
              section below. We will verify your identity first to ensure
              personal data security. After verification, we will respond to
              your request within the timeframe specified by applicable laws and
              regulations. Please note that under certain conditions, we may
              refuse your request if required or permitted by law, or if the
              request cannot be technically or legally implemented. We may
              charge reasonable administrative fees for certain requests in
              accordance with applicable regulations.
            </>
          ),
        },
        {
          title: "Children's Personal Data",
          body: "Our services are generally not intended for children under 18 years of age. If processing of children's personal data is necessary for certain services, we will obtain consent from the legal parent or guardian in accordance with Article 21 paragraph (2) of the PDP Law. If we become aware that we have collected children's personal data without lawful consent, we will take steps to delete such data as soon as possible.",
        },
        {
          title: "Changes to Privacy Policy",
          body: "We may update this Privacy Policy from time to time to reflect changes in our practices, services, or applicable laws and regulations. Material changes will be notified to you via email, service notifications, or other appropriate means. The 'Last Updated' date at the top of this policy will indicate when the last changes were made. We encourage you to review this policy periodically to stay informed about how we protect your personal data. Your use of our services after policy changes means you accept the updated policy.",
        },
        {
          title: "Contact and Personal Data Controller",
          body: (
            <>
              The Personal Data Controller for these services is{" "}
              <strong>{PERSONAL_INFO.name}</strong> domiciled in the legal
              territory of the Republic of Indonesia. If you have questions,
              concerns, or requests regarding this Privacy Policy or the
              processing of your personal data, or if you wish to exercise your
              rights as a Personal Data Subject, please contact us at:{" "}
              <a
                href={`mailto:${email}`}
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                {email}
              </a>
              . We will respond to your inquiries or requests within a
              reasonable time and in accordance with applicable laws and
              regulations. For complaints regarding alleged violations of
              personal data protection, you may also contact the Personal Data
              Protection Agency established under Article 58 of the PDP Law once
              the agency is officially operational.
            </>
          ),
        },
      ],
      footer:
        "By using our services, you acknowledge that you have read, understood, and agreed to the collection, processing, use, disclosure, storage, and protection of your personal data as described in this Privacy Policy in accordance with Law No. 27 of 2022 on Personal Data Protection and other applicable laws and regulations in the Republic of Indonesia.",
    },
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Language Switcher */}
        <div className="flex justify-end mb-6 sm:mb-8">
          <Button
            onClick={toggleLang}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm sm:text-base"
          >
            <Globe2 className="w-4 h-4 sm:w-5 sm:h-5" />
            {lang === "id" ? "English" : "Bahasa Indonesia"}
          </Button>
        </div>

        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          className="text-center mb-12 sm:mb-16 px-2"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight sm:leading-snug">
            {content[lang].title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3">
            {content[lang].updated}: {new Date().toLocaleDateString("id-ID")}
          </p>
        </motion.header>

        {/* Content */}
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
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed sm:leading-loose">
                  {section.body}
                </p>
              )}
              {section.list && (
                <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground leading-relaxed sm:leading-loose space-y-1">
                  {section.list.map((item, j) => (
                    <motion.li key={j}>{item}</motion.li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          className="text-xs sm:text-sm text-muted-foreground text-center mt-16 sm:mt-20 italic leading-relaxed"
        >
          {content[lang].footer}
        </motion.p>
      </div>
    </section>
  );
}
