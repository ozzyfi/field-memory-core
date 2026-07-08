// Lightweight dictionary-based i18n for ToolA (frontend-only).
// Default language: Turkish. No external i18n library.

export type Lang = "tr" | "en";

export const LANG_STORAGE_KEY = "saha:lang";
export const DEFAULT_LANG: Lang = "tr";

type Dict = Record<string, string>;

const tr: Dict = {
  // Navigation
  "nav.dashboard": "Genel Bakış",
  "nav.work-orders": "İş Emri Atama ve Takip",
  "nav.ai-chat": "AI Asistan",
  "nav.data-sources": "Bilgi Kaynakları",
  "nav.ai-clients": "Entegrasyonlar",
  "nav.data-quality": "Veri Kalitesi",
  "nav.api": "API / MCP",
  "nav.audit": "Denetim Kayıtları",
  "nav.billing": "Plan / Kullanım",

  // Dashboard
  "dashboard.title": "Merkez Panel",
  "dashboard.subtitle":
    "Sahadan gelen arıza ve bakım taleplerini iş emrine, ekipman geçmişine ve operasyon içgörülerine dönüştürün.",
  "metric.whatsapp": "Gelen bakım talebi",
  "metric.records": "Açılan iş emri",
  "metric.crm": "Ekipman geçmişine işlenen kayıt",
  "metric.critical": "Açık kritik iş",
  "metric.training": "Teknisyen eğitim ihtiyacı",
  "metric.timeSaved": "Kurtarılan yönetici zamanı",

  // AI modes
  "mode.general": "Genel Arama",
  "mode.quality": "Kalite Kontrol",
  "mode.compliance": "Prosedür Kontrolü",
  "mode.audit": "Denetim Geçmişi",
  "mode.storefile": "Ekipman Dosyası Analizi",

  // Dashboard (existing metrics & chart)
  "dashboard.lead": "AI-ready bakım verisi, veri kalitesi ve kullanım performansı.",
  "dashboard.opsPerformance": "Operasyon Performansı",
  "metric.aiReady": "AI-ready kayıt",
  "metric.qualityScore": "Veri kalite puanı",
  "metric.evidencedClosure": "Kanıtlı kapanış",
  "metric.queriesPeriod": "Sorgu bu dönem",
  "chart.records": "Kayıt",
  "chart.queries": "Sorgu",
  "chart.noData": "Henüz kayıt yok — ilk bakım kaydını ekleyin",
  "card.aiClients.title": "Entegrasyonlar",
  "card.aiClients.text": "Claude, ChatGPT, Copilot veya local LLM bağlantısı kurun.",
  "card.dataSources.title": "Bilgi Kaynakları",
  "card.dataSources.text": "Saha bildirimleri, iş emri formları, ekipman dokümanları ve CMMS verilerini bağlayın.",
  "card.api.title": "API Anahtarları",
  "card.api.text": "Kurumsal AI ajanları için güvenli API ve MCP erişimi oluşturun.",
  "card.quality.title": "Kalite Puanı",
  "card.quality.text": "Eksik kök neden, kanıtsız kapanış ve eşleşmeyen kayıtları görün.",
  "ai.askTitle": "AI Asistan",
  "ai.askSubtitle": "İş emirleri, ekipman geçmişi, arıza tekrarları ve teknisyen performansını AI ile sorgulayın.",
  "ai.preparing": "Çalışma alanı hazırlanıyor…",
  "ai.generating": "Cevap oluşturuluyor…",
  "ai.history": "Geçmiş",
  "ai.newChat": "Yeni sohbet",
  "ai.chatHistory": "Sohbet geçmişi",
  "ai.noConversations": "Henüz sohbet yok.",
  "ai.stop": "Durdur",
  "ai.send": "Gönder",
  "ai.copy": "Kopyala",
  "ai.copied": "Kopyalandı",
  "ai.retry": "Tekrar dene",
  "ai.openSources": "Kaynakları aç",
  "preview.fullscreen": "Tam ekran",
  "preview.evidenceTitle": "Kanıt Önizleme",
  "preview.zoomIn": "Yakınlaştır",
  "preview.zoomOut": "Uzaklaştır",
  "preview.reset": "Sıfırla",
  "preview.openNewTab": "Yeni sekmede aç",
  "preview.close": "Kapat",
  "preview.clickToEnlarge": "Büyütmek için tıklayın",
  "ai.stopped": "Durduruldu.",
  "ai.demoData": "Örnek veri",
  "ai.records": "kayıt",

  // Status labels
  "status.open": "Açık",
  "status.closed": "Kapalı",
  "status.pending": "Beklemede",
  "status.critical": "Kritik",
  "status.medium": "Orta",
  "status.low": "Düşük",
  "status.connected": "Bağlı",
  "status.setup": "Kurulum gerekli",
  "status.error": "Hata var",
  "status.sample": "Örnek veri",

  // Buttons & empty states
  "btn.addRecord": "Bakım Kaydı Ekle",
  "btn.openRecord": "Kaydı Aç",
  "btn.whatsappReply": "Saha Yanıtı",
  "btn.crmNote": "Ekipman Notu",
  "btn.viewDetails": "Detayları Gör",
  "btn.cancel": "İptal",
  "btn.contact": "Bize ulaşın",
  "empty.records": "Henüz bakım kaydı yok. Demo için ilk arıza kaydını ekleyin.",

  // Branding
  "brand.tagline": "AI destekli bakım ve iş emri yönetimi",

  // Sidebar
  "sidebar.records": "Bakım kaydı",
  "sidebar.recordsLeft": "kayıt hakkı kaldı",
  "sidebar.loading": "Yükleniyor…",
  "sidebar.credit": "Kredi",
  "sidebar.addCredit": "Kredi ekle",
  "sidebar.org": "Organizasyon",
  "sidebar.account": "Hesap",

  // Dashboard demo widgets
  "dashboard.sampleData": "Örnek panel verisidir.",
  "dashboard.liveFlow": "Canlı Saha Akışı",
  "dashboard.recurring": "Tekrar Eden Arızalar",
  "field.event": "Olay",
  "field.location": "Lokasyon",
  "field.priority": "Öncelik",
  "field.action": "Aksiyon",
  "field.times": "kez raporlandı",
  "field.recordsCount": "kayıt",

  // Data Sources
  "ds.title": "Bilgi Kaynakları",
  "ds.subtitle": "Saha bildirimlerini, bakım prosedürlerini ve operasyon sistemlerini ToolA'ya bağlayın.",
  "ds.whatsapp": "Saha Bildirim Kanalları",
  "ds.knowledge": "Teknik Dokümanlar",
  "ds.operations": "Operasyon Sistemleri",
  "ds.recent": "Son Bakım Kayıtları",
  "ds.contactTitle": "Daha fazla erişim için bize ulaşın",
  "ds.contactText": "Ek tesis, bölge ve CMMS/ERP veri kaynakları için kurumsal erişim açılabilir.",
  "status.syncing": "Senkronize ediliyor",
  "ds.noLocation": "Lokasyon belirtilmedi",

  // Add Field Record dialog
  "rec.title": "Yeni Bakım Kaydı Ekle",
  "rec.desc": "Manuel bakım / arıza kaydı oluşturun — AI sorgularına anında dahil olur.",
  "rec.source": "Kaynak",
  "rec.status": "Durum",
  "rec.rawText": "Ham metin",
  "rec.rawPlaceholder": "Arıza açıklaması veya saha mesajı",
  "rec.location": "Lokasyon / Tesis",
  "rec.locationPlaceholder": "örn. Gebze Fabrikası – Hat 2",
  "rec.topic": "Konu",
  "rec.topicPlaceholder": "örn. Pompa titreşimi",
  "rec.assetCode": "Ekipman kodu",
  "rec.action": "Aksiyon",
  "rec.actionPlaceholder": "Yapılması gereken",
  "rec.rootCause": "Kök Neden",
  "rec.rootCausePlaceholder": "Arızanın kök nedeni",
  "rec.rootCauseHint": "Kapatılan iş emirlerinde kök neden önerilir",
  "rec.resolution": "Çözüm / Kapanış Notu",
  "rec.resolutionPlaceholder": "Yapılan bakım veya onarım detayı",
  "rec.evidenceFiles": "Kanıt Dosyaları (resim / PDF)",
  "rec.filesSelected": "dosya seçildi",
  "rec.submit": "Kaydı Ekle",
  "rec.submitting": "Ekleniyor…",
  "rec.srcWhatsapp": "Saha Bildirimi",
  "rec.srcForm": "İş Emri Formu",
  "rec.srcManual": "Manuel Giriş",

  // Login
  "login.signin": "Giriş yap",
  "login.signup": "Hesap oluştur",
  "login.tagline": "AI destekli bakım ve iş emri yönetimi",
  "login.email": "E-posta",
  "login.password": "Parola",
  "login.wait": "Lütfen bekleyin…",
  "login.signinBtn": "Giriş yap",
  "login.signupBtn": "Kayıt ol",
  "login.toSignup": "Hesabın yok mu? Kayıt ol",
  "login.toSignin": "Zaten hesabın var mı? Giriş yap",
  "login.checkInbox": "E-postanızı doğrulamak için gelen kutunuzu kontrol edin.",
  "login.authFailed": "Kimlik doğrulama başarısız",

  // Onboarding
  "onboard.welcome": "ToolA'ya hoş geldiniz",
  "onboard.dash.1": "Saha ve CMMS kaynaklarını bağlayın",
  "onboard.dash.2": "Gelen bildirimleri iş emrine ve aksiyona dönüştürün",
  "onboard.dash.3": "Merkez panelden tekrar eden arızaları ve teknisyen performansını takip edin",
  "onboard.ds": "Saha bildirim kanallarınızı, bakım dokümanlarınızı ve operasyon sistemlerinizi bağlayın.",

  // Data Quality
  "dq.title": "Veri Kalitesi",
  "dq.subtitle": "Sahadan gelen bakım verisinin AI tarafından güvenilir kullanılabilirliğini ölçün.",
  "dq.runAudit": "Analizi çalıştır",
  "dq.updated": "Analiz güncellendi",
  "dq.qualityScore": "Kalite Puanı",
  "dq.qualityScoreText": "Genel AI-ready veri kalitesi.",
  "dq.evidenced": "Kanıtlı Kapanış",
  "dq.evidencedText": "Fotoğraf, ölçüm veya rapor ile kapanan işler.",
  "dq.missingRoot": "Eksik Kök Neden",
  "dq.missingRootText": "Kapanmış ama kök nedeni eksik iş emirleri.",
  "dq.unmatched": "Eşleşmeyen Kanıt",
  "dq.unmatchedText": "İş emri veya ekipmana bağlanmamış fotoğraf/ölçüm.",
  "dq.fixSuggestions": "Düzeltme önerileri",
  "dq.allReady": "Tüm kayıtlar AI-ready",
  "dq.allReadyDesc": "İyi iş — düzeltilecek bir kayıt bulunamadı.",
  "dq.problem": "Problem",
  "dq.record": "Kayıt",
  "dq.suggestion": "Öneri",
  "dq.status": "Durum",

  // Billing
  "bill.title": "Plan / Kullanım",
  "bill.subtitle": "Kredi, kullanım ve fatura yönetimi.",
  "bill.balance": "Bakiye",

  // Audit
  "audit.title": "Denetim Kayıtları",
  "audit.subtitle": "Hangi AI client, hangi bakım verisine, hangi kaynak üzerinden erişti?",
  "audit.searchPlaceholder": "Sorgu içinde ara…",
  "audit.all": "Tümü",
  "audit.noQueries": "Henüz AI sorgusu yapılmadı",
  "audit.noQueriesDesc": "AI sorguları yapıldıkça burada görünür.",
  "audit.noMatch": "Filtreyle eşleşen sorgu yok",
  "audit.noMatchDesc": "Farklı bir client veya arama deneyin.",
  "audit.time": "Zaman",
  "audit.client": "Client",
  "audit.query": "Sorgu",
  "audit.sources": "Kaynaklar",
  "audit.user": "Kullanıcı",

  // API / MCP
  "api.subtitle": "ToolA bakım hafızasını kurumsal agent'lara ve kendi uygulamalarınıza açın.",
  "api.createKey": "Anahtar oluştur",
  "api.mcpEndpoint": "MCP Endpoint",
  "api.mcpDesc": "Claude, Cursor, ChatGPT connector veya custom agent'lar için model-bağımsız erişim.",
  "api.availableTools": "Mevcut araçlar",
  "api.tool": "Araç",
  "api.description": "Açıklama",
  "api.permission": "Yetki",
  "api.apiKeys": "API Anahtarları",
  "api.name": "Ad",
  "api.preview": "Önizleme",
  "api.created": "Oluşturulma",
  "api.lastUsed": "Son kullanım",
  "api.active": "Aktif",
  "api.noKeys": "Henüz API anahtarı yok",
  "api.noKeysDesc": "Kurumsal AI ajanları için ilk API anahtarınızı oluşturun.",
  "api.deleteKey": "Anahtarı sil?",
  "api.deleteKeyDesc": "anahtarı kalıcı olarak silinecek. Bu işlem geri alınamaz.",
  "api.delete": "Sil",
  "api.keyActivated": "Anahtar etkinleştirildi",
  "api.keyDeactivated": "Anahtar pasifleştirildi",
  "api.keyDeleted": "Anahtar silindi",

  // AI Clients
  "aic.title": "Entegrasyonlar",
  "aic.subtitle": "AI-ready bakım hafızanızı istediğiniz yapay zekâ ile güvenli şekilde kullanın.",
  "aic.connect": "AI client bağla",
  "aic.tryQuery": "Bakım hafızanızı deneyin",
  "aic.manage": "Bağlantıları yönet",
  "aic.notReady": "Çalışma alanı hazır değil",
  "aic.claude": "MCP üzerinden bakım hafızasına kaynaklı erişim.",
  "aic.chatgpt": "Enterprise connector veya API gateway ile sorgulama.",
  "aic.copilot": "Microsoft ortamında izinli bakım verisi erişimi.",
  "aic.localllm": "Veri dışarı çıkmadan kendi sunucunuzdaki modele bağlanın.",

  // Field record detail sheet
  "detail.title": "Bakım Kaydı",
  "detail.edit": "Düzenle",
  "detail.cancel": "Vazgeç",
  "detail.delete": "Sil",
  "detail.save": "Kaydet",
  "detail.saving": "Kaydediliyor…",
  "detail.deleting": "Siliniyor…",
  "detail.assetId": "Ekipman ID",
  "detail.evidence": "Kanıtlar",
  "detail.uploading": "Yükleniyor…",
  "detail.quality": "Kalite",
  "detail.createdAt": "Oluşturulma",
  "detail.closedAt": "Kapanış",
  "detail.deleteConfirm": "Kaydı sil?",
  "detail.deleteConfirmDesc": "Bu kayıt kalıcı olarak silinecek ve geri alınamayacak.",
  "detail.updated": "Kayıt güncellendi ✓",
  "detail.updateFailed": "Güncellenemedi",
  "detail.deleted": "Kayıt silindi",
  "detail.deleteFailed": "Silinemedi",

  // Add field record (toasts & validation)
  "rec.notReady": "Workspace henüz hazır değil, biraz sonra deneyin.",
  "rec.added": "Kayıt eklendi ✓",
  "rec.addFailed": "Kayıt eklenemedi",
  "rec.rawRequired": "Ham metin gerekli",

  // Relative time
  "time.now": "şimdi",
  "time.minAgo": "dakika önce",
  "time.hourAgo": "saat önce",
  "time.dayAgo": "gün önce",

  // Workspace dropdown (frontend-only)
  "ws.workspace": "Çalışma Alanı",
  "ws.countries": "Tesis ve lokasyonlar",
  "ws.channels": "Saha kanalları",
  "ws.team": "Ekip ve roller",
  "ws.plan": "Plan / Kullanım",
  "ws.settings": "Workspace ayarları",
  "ws.soon": "Yakında",

  // Field channel structure (demo)
  "wcs.title": "Saha Bildirim Kanal Yapısı",
  "wcs.subtitle": "Tesis bazlı saha kanalları ve ayrı yönetici bilgi güncelleme kanalıyla bakım operasyonlarını yönetin.",
  "wcs.sample": "Örnek kurumsal yapı",

  // Phone mapping (demo)
  "pm.title": "Telefon Numarası → Rol ve Lokasyon Eşleştirme",
  "pm.body": "Sahadan gelen telefon numarası, kişiyi tanımak için kullanılır. ToolA bu kişiyi rol, tesis, hat ve yetki bilgileriyle eşleştirir.",
  "pm.example": "Örnek eşleştirme",

  // Knowledge update drafts (demo)
  "kud.title": "Bilgi Güncelleme Taslakları",
  "kud.subtitle": "Yönetici kanalından gelen prosedür, talimat ve dokümanlar onaydan sonra bilgi tabanına yayınlanır.",
  "kud.ai": "AI çıkarımı",
  "kud.preview": "Önizle",
  "kud.sendApproval": "Onaya Gönder",
  "kud.publish": "Yayınla",
  "kud.reject": "Reddet",

  // Dashboard admin channel insight (demo)
  "dash.admin.title": "Yönetici Kanalından Gelen Güncellemeler",
  "dash.admin.content": "Bu hafta 6 bakım prosedürü ve talimat dokümanı yönetici kanalından alındı. 4 güncelleme onaylandı, 2 güncelleme çakışma kontrolünde.",

  // Language switcher
  "lang.tr": "TR",
  "lang.en": "EN",

  // Work Orders screen
  "wo.title": "İş Emri Atama ve Takip",
  "wo.subtitle": "ToolA ile sohbet ederek iş emri oluşturun, en uygun teknisyeni önerin ve tek tıkla atayın.",
  "wo.tab.new": "Yeni İş Emri",
  "wo.tab.open": "Açık İş Emirleri",
  "wo.tab.suggest": "Atama Önerileri",
  "wo.chat.title": "ToolA ile iş emri oluştur",
  "wo.chat.placeholder": "örn. Pompa P-204 için arıza kaydı oluştur, öncelik yüksek, uygun teknisyeni öner",
  "wo.chat.send": "Gönder",
  "wo.chat.quick": "Hızlı örnekler",
  "wo.summary.title": "İş Emri Özeti",
  "wo.summary.subtitle": "Yazdıkça sağda yapılandırılmış iş emri oluşur.",
  "wo.f.type": "Tip",
  "wo.f.title": "Başlık",
  "wo.f.asset": "Ekipman",
  "wo.f.location": "Lokasyon",
  "wo.f.desc": "Açıklama",
  "wo.f.priority": "Öncelik",
  "wo.f.sla": "Hedef süre / SLA",
  "wo.f.skill": "Gerekli yetkinlik",
  "wo.f.suggested": "Önerilen teknisyenler",
  "wo.f.assignee": "Atanan kişi",
  "wo.f.reason": "Atama gerekçesi",
  "wo.f.parts": "Gerekli ekipman / parça",
  "wo.f.notes": "Notlar",
  "wo.act.saveDraft": "Taslak kaydet",
  "wo.act.create": "İş emri oluştur",
  "wo.act.assign": "Ata ve bildir",
  "wo.act.edit": "Düzenle",
  "wo.type.fault": "Arıza",
  "wo.type.maint": "Bakım",
  "wo.type.install": "Kurulum",
  "wo.type.test": "Test",
  "wo.open.title": "Açık İş Emirleri",
  "wo.open.col.id": "No",
  "wo.open.col.title": "Başlık",
  "wo.open.col.asset": "Ekipman",
  "wo.open.col.assignee": "Atanan",
  "wo.open.col.priority": "Öncelik",
  "wo.open.col.status": "Durum",
  "wo.open.col.age": "Süre",
  "wo.st.open": "Açık",
  "wo.st.assigned": "Atandı",
  "wo.st.enroute": "Yolda",
  "wo.st.onsite": "Sahada",
  "wo.st.waiting": "Beklemede",
  "wo.st.done": "Tamamlandı",
  "wo.sug.title": "Atama İçgörüleri",
  "wo.sug.reassign": "Yeniden atama gerekenler",
  "wo.sug.overdue": "Geciken işler",
  "wo.sug.busy": "Yoğun teknisyenler",
  "wo.sug.available": "Uygun teknisyenler",
  "wo.rec.title": "Önerilen teknisyen",
  "wo.rec.reasons": "Öneri gerekçeleri",
  "wo.rec.skill": "Uzmanlık uyumu",
  "wo.rec.similar": "Benzer iş tecrübesi",
  "wo.rec.load": "Mevcut iş yükü",
  "wo.rec.avail": "Müsaitlik",
  "wo.rec.near": "Lokasyona yakınlık",
  "wo.rec.conflict": "Çakışma kontrolü",
};

const en: Dict = {
  // Navigation
  "nav.dashboard": "Overview",
  "nav.work-orders": "Work Order Assignment",
  "nav.ai-chat": "AI Assistant",
  "nav.data-sources": "Knowledge Sources",
  "nav.ai-clients": "Integrations",
  "nav.data-quality": "Data Quality",
  "nav.api": "API / MCP",
  "nav.audit": "Audit Log",
  "nav.billing": "Plan / Usage",

  // Dashboard
  "dashboard.title": "Central Dashboard",
  "dashboard.subtitle":
    "Turn field fault and maintenance requests into work orders, equipment history, and operations insights.",
  "metric.whatsapp": "Incoming requests",
  "metric.records": "Work orders opened",
  "metric.crm": "Equipment-history notes",
  "metric.critical": "Open critical work",
  "metric.training": "Technician training needs",
  "metric.timeSaved": "Manager time saved",

  // AI modes
  "mode.general": "General Search",
  "mode.quality": "Quality Review",
  "mode.compliance": "Procedure Check",
  "mode.audit": "Audit Trail",
  "mode.storefile": "Equipment File Analysis",

  // Dashboard (existing metrics & chart)
  "dashboard.lead": "AI-ready maintenance data, data quality and usage performance.",
  "dashboard.opsPerformance": "Operations Performance",
  "metric.aiReady": "AI-ready records",
  "metric.qualityScore": "Data quality score",
  "metric.evidencedClosure": "Evidenced closures",
  "metric.queriesPeriod": "Queries this period",
  "chart.records": "Records",
  "chart.queries": "Queries",
  "chart.noData": "No records yet — add your first maintenance record",
  "card.aiClients.title": "Integrations",
  "card.aiClients.text": "Connect Claude, ChatGPT, Copilot or a local LLM.",
  "card.dataSources.title": "Knowledge Sources",
  "card.dataSources.text": "Connect field alerts, work-order forms, equipment docs and CMMS data.",
  "card.api.title": "API Keys",
  "card.api.text": "Create secure API and MCP access for enterprise AI agents.",
  "card.quality.title": "Quality Score",
  "card.quality.text": "See missing root causes, evidence-less closures and unmatched records.",
  "ai.askTitle": "AI Assistant",
  "ai.askSubtitle": "Query work orders, equipment history, recurring faults, and technician performance with AI.",
  "ai.preparing": "Preparing workspace…",
  "ai.generating": "Generating answer…",
  "ai.history": "History",
  "ai.newChat": "New chat",
  "ai.chatHistory": "Chat history",
  "ai.noConversations": "No conversations yet.",
  "ai.stop": "Stop",
  "ai.send": "Send",
  "ai.copy": "Copy",
  "ai.copied": "Copied",
  "ai.retry": "Retry",
  "ai.openSources": "Open sources",
  "preview.fullscreen": "Fullscreen",
  "preview.evidenceTitle": "Evidence Preview",
  "preview.zoomIn": "Zoom in",
  "preview.zoomOut": "Zoom out",
  "preview.reset": "Reset",
  "preview.openNewTab": "Open in new tab",
  "preview.close": "Close",
  "preview.clickToEnlarge": "Click to enlarge",
  "ai.stopped": "Stopped.",
  "ai.demoData": "Demo data",
  "ai.records": "records",

  // Status labels
  "status.open": "Open",
  "status.closed": "Closed",
  "status.pending": "Pending",
  "status.critical": "Critical",
  "status.medium": "Medium",
  "status.low": "Low",
  "status.connected": "Connected",
  "status.setup": "Setup needed",
  "status.error": "Error",
  "status.sample": "Sample data",

  // Buttons & empty states
  "btn.addRecord": "Add Maintenance Record",
  "btn.openRecord": "Open Record",
  "btn.whatsappReply": "Field Reply",
  "btn.crmNote": "Equipment Note",
  "btn.viewDetails": "View Details",
  "btn.cancel": "Cancel",
  "btn.contact": "Contact us",
  "empty.records": "No maintenance records yet. Add the first fault report for the demo.",

  // Branding
  "brand.tagline": "AI-powered maintenance and work-order management",

  // Sidebar
  "sidebar.records": "Maintenance records",
  "sidebar.recordsLeft": "records remaining",
  "sidebar.loading": "Loading…",
  "sidebar.credit": "Credit",
  "sidebar.addCredit": "Add credit",
  "sidebar.org": "Organization",
  "sidebar.account": "Account",

  // Dashboard demo widgets
  "dashboard.sampleData": "Sample dashboard data.",
  "dashboard.liveFlow": "Live Field Flow",
  "dashboard.recurring": "Recurring Faults",
  "field.event": "Event",
  "field.location": "Location",
  "field.priority": "Priority",
  "field.action": "Action",
  "field.times": "times reported",
  "field.recordsCount": "records",

  // Data Sources
  "ds.title": "Knowledge Sources",
  "ds.subtitle": "Connect field alerts, maintenance procedures and operational systems to ToolA.",
  "ds.whatsapp": "Field Alert Channels",
  "ds.knowledge": "Technical Documents",
  "ds.operations": "Operational Systems",
  "ds.recent": "Recent Maintenance Records",
  "ds.contactTitle": "Contact us for more access",
  "ds.contactText": "Enterprise access can be enabled for additional facility, region and CMMS/ERP data sources.",
  "status.syncing": "Syncing",
  "ds.noLocation": "No location specified",

  // Add Field Record dialog
  "rec.title": "Add New Maintenance Record",
  "rec.desc": "Create a manual maintenance/fault record — instantly included in AI queries.",
  "rec.source": "Source",
  "rec.status": "Status",
  "rec.rawText": "Raw text",
  "rec.rawPlaceholder": "Fault description or field message",
  "rec.location": "Location / Facility",
  "rec.locationPlaceholder": "e.g. Gebze Plant – Line 2",
  "rec.topic": "Topic",
  "rec.topicPlaceholder": "e.g. Pump vibration",
  "rec.assetCode": "Equipment code",
  "rec.action": "Action",
  "rec.actionPlaceholder": "What needs to be done",
  "rec.rootCause": "Root Cause",
  "rec.rootCausePlaceholder": "Root cause of the fault",
  "rec.rootCauseHint": "Root cause is recommended for closed work orders",
  "rec.resolution": "Resolution / Closing Note",
  "rec.resolutionPlaceholder": "Maintenance or repair detail",
  "rec.evidenceFiles": "Evidence Files (image / PDF)",
  "rec.filesSelected": "file(s) selected",
  "rec.submit": "Add Record",
  "rec.submitting": "Adding…",
  "rec.srcWhatsapp": "Field Alert",
  "rec.srcForm": "Work Order Form",
  "rec.srcManual": "Manual Entry",

  // Login
  "login.signin": "Sign in",
  "login.signup": "Create account",
  "login.tagline": "AI-powered maintenance and work-order management",
  "login.email": "Email",
  "login.password": "Password",
  "login.wait": "Please wait…",
  "login.signinBtn": "Sign in",
  "login.signupBtn": "Sign up",
  "login.toSignup": "Don't have an account? Sign up",
  "login.toSignin": "Already have an account? Sign in",
  "login.checkInbox": "Check your inbox to confirm your email.",
  "login.authFailed": "Authentication failed",

  // Onboarding
  "onboard.welcome": "Welcome to ToolA",
  "onboard.dash.1": "Connect field and CMMS sources",
  "onboard.dash.2": "Turn incoming alerts into work orders and actions",
  "onboard.dash.3": "Track recurring faults and technician performance from the central dashboard",
  "onboard.ds": "Connect your field alert channels, maintenance documents, and operational systems.",

  // Data Quality
  "dq.title": "Data Quality",
  "dq.subtitle": "Measure how reliably AI can use the maintenance data coming from the field.",
  "dq.runAudit": "Run audit",
  "dq.updated": "Analysis updated",
  "dq.qualityScore": "Quality Score",
  "dq.qualityScoreText": "Overall AI-ready data quality.",
  "dq.evidenced": "Evidenced Closures",
  "dq.evidencedText": "Work closed with photo, measurement or report.",
  "dq.missingRoot": "Missing Root Cause",
  "dq.missingRootText": "Closed work orders missing a root cause.",
  "dq.unmatched": "Unmatched Evidence",
  "dq.unmatchedText": "Photo/measurement not linked to a work order or asset.",
  "dq.fixSuggestions": "Fix suggestions",
  "dq.allReady": "All records are AI-ready",
  "dq.allReadyDesc": "Good job — no records to fix were found.",
  "dq.problem": "Problem",
  "dq.record": "Record",
  "dq.suggestion": "Suggestion",
  "dq.status": "Status",

  // Billing
  "bill.title": "Plan / Usage",
  "bill.subtitle": "Credit, usage and billing management.",
  "bill.balance": "Balance",

  // Audit
  "audit.title": "Audit Log",
  "audit.subtitle": "Which AI client accessed which maintenance data, through which source?",
  "audit.searchPlaceholder": "Search within queries…",
  "audit.all": "All",
  "audit.noQueries": "No AI queries yet",
  "audit.noQueriesDesc": "They will appear here as AI queries are made.",
  "audit.noMatch": "No queries match the filter",
  "audit.noMatchDesc": "Try a different client or search.",
  "audit.time": "Time",
  "audit.client": "Client",
  "audit.query": "Query",
  "audit.sources": "Sources",
  "audit.user": "User",

  // API / MCP
  "api.subtitle": "Open ToolA maintenance memory to enterprise agents and your own apps.",
  "api.createKey": "Create key",
  "api.mcpEndpoint": "MCP Endpoint",
  "api.mcpDesc": "Model-agnostic access for Claude, Cursor, ChatGPT connector or custom agents.",
  "api.availableTools": "Available tools",
  "api.tool": "Tool",
  "api.description": "Description",
  "api.permission": "Permission",
  "api.apiKeys": "API Keys",
  "api.name": "Name",
  "api.preview": "Preview",
  "api.created": "Created",
  "api.lastUsed": "Last used",
  "api.active": "Active",
  "api.noKeys": "No API keys yet",
  "api.noKeysDesc": "Create your first API key for enterprise AI agents.",
  "api.deleteKey": "Delete key?",
  "api.deleteKeyDesc": "will be permanently deleted. This action cannot be undone.",
  "api.delete": "Delete",
  "api.keyActivated": "Key activated",
  "api.keyDeactivated": "Key deactivated",
  "api.keyDeleted": "Key deleted",

  // AI Clients
  "aic.title": "Integrations",
  "aic.subtitle": "Use your AI-ready maintenance memory securely with any AI of your choice.",
  "aic.connect": "Connect an AI client",
  "aic.tryQuery": "Try your maintenance memory",
  "aic.manage": "Manage connections",
  "aic.notReady": "Workspace not ready",
  "aic.claude": "Sourced access to maintenance memory via MCP.",
  "aic.chatgpt": "Query through an enterprise connector or API gateway.",
  "aic.copilot": "Permissioned maintenance data access in the Microsoft environment.",
  "aic.localllm": "Connect to your own on-prem model without data leaving.",

  // Field record detail sheet
  "detail.title": "Maintenance Record",
  "detail.edit": "Edit",
  "detail.cancel": "Cancel",
  "detail.delete": "Delete",
  "detail.save": "Save",
  "detail.saving": "Saving…",
  "detail.deleting": "Deleting…",
  "detail.assetId": "Equipment ID",
  "detail.evidence": "Evidence",
  "detail.uploading": "Uploading…",
  "detail.quality": "Quality",
  "detail.createdAt": "Created",
  "detail.closedAt": "Closed",
  "detail.deleteConfirm": "Delete record?",
  "detail.deleteConfirmDesc": "This record will be permanently deleted and cannot be recovered.",
  "detail.updated": "Record updated ✓",
  "detail.updateFailed": "Could not update",
  "detail.deleted": "Record deleted",
  "detail.deleteFailed": "Could not delete",

  // Add field record (toasts & validation)
  "rec.notReady": "Workspace is not ready yet, please try again shortly.",
  "rec.added": "Record added ✓",
  "rec.addFailed": "Could not add record",
  "rec.rawRequired": "Raw text is required",

  // Relative time
  "time.now": "now",
  "time.minAgo": "min ago",
  "time.hourAgo": "h ago",
  "time.dayAgo": "d ago",

  // Workspace dropdown (frontend-only)
  "ws.workspace": "Workspace",
  "ws.countries": "Facilities and locations",
  "ws.channels": "Field channels",
  "ws.team": "Team and roles",
  "ws.plan": "Plan / Usage",
  "ws.settings": "Workspace settings",
  "ws.soon": "Coming soon",

  // Field channel structure (demo)
  "wcs.title": "Field Alert Channel Structure",
  "wcs.subtitle": "Manage maintenance operations with facility-based field channels and a separate admin knowledge update channel.",
  "wcs.sample": "Sample enterprise setup",

  // Phone mapping (demo)
  "pm.title": "Phone Number → Role and Location Mapping",
  "pm.body": "The incoming field phone number is used to identify the contact. ToolA maps the contact to role, facility, line, and permission scope.",
  "pm.example": "Example mapping",

  // Knowledge update drafts (demo)
  "kud.title": "Knowledge Update Drafts",
  "kud.subtitle": "Procedures, instructions and documents received from the admin channel are published to the knowledge base after approval.",
  "kud.ai": "AI extraction",
  "kud.preview": "Preview",
  "kud.sendApproval": "Send for Approval",
  "kud.publish": "Publish",
  "kud.reject": "Reject",

  // Dashboard admin channel insight (demo)
  "dash.admin.title": "Updates from Admin Channel",
  "dash.admin.content": "This week, 6 maintenance procedures and instruction documents were received through the admin channel. 4 updates were approved, 2 are in conflict review.",

  // Language switcher
  "lang.tr": "TR",
  "lang.en": "EN",

  // Work Orders screen
  "wo.title": "Work Order Assignment",
  "wo.subtitle": "Chat with ToolA to create work orders, get the best technician recommendation, and assign in one click.",
  "wo.tab.new": "New Work Order",
  "wo.tab.open": "Open Work Orders",
  "wo.tab.suggest": "Assignment Insights",
  "wo.chat.title": "Create a work order with ToolA",
  "wo.chat.placeholder": "e.g. Open a fault ticket for pump P-204, high priority, suggest the best technician",
  "wo.chat.send": "Send",
  "wo.chat.quick": "Quick examples",
  "wo.summary.title": "Work Order Summary",
  "wo.summary.subtitle": "A structured work order fills in on the right as you type.",
  "wo.f.type": "Type",
  "wo.f.title": "Title",
  "wo.f.asset": "Equipment",
  "wo.f.location": "Location",
  "wo.f.desc": "Description",
  "wo.f.priority": "Priority",
  "wo.f.sla": "Target time / SLA",
  "wo.f.skill": "Required skill",
  "wo.f.suggested": "Suggested technicians",
  "wo.f.assignee": "Assignee",
  "wo.f.reason": "Assignment rationale",
  "wo.f.parts": "Required parts / equipment",
  "wo.f.notes": "Notes",
  "wo.act.saveDraft": "Save draft",
  "wo.act.create": "Create work order",
  "wo.act.assign": "Assign & notify",
  "wo.act.edit": "Edit",
  "wo.type.fault": "Fault",
  "wo.type.maint": "Maintenance",
  "wo.type.install": "Install",
  "wo.type.test": "Test",
  "wo.open.title": "Open Work Orders",
  "wo.open.col.id": "No",
  "wo.open.col.title": "Title",
  "wo.open.col.asset": "Equipment",
  "wo.open.col.assignee": "Assignee",
  "wo.open.col.priority": "Priority",
  "wo.open.col.status": "Status",
  "wo.open.col.age": "Age",
  "wo.st.open": "Open",
  "wo.st.assigned": "Assigned",
  "wo.st.enroute": "En route",
  "wo.st.onsite": "On site",
  "wo.st.waiting": "Waiting",
  "wo.st.done": "Completed",
  "wo.sug.title": "Assignment Insights",
  "wo.sug.reassign": "Needs reassignment",
  "wo.sug.overdue": "Overdue jobs",
  "wo.sug.busy": "Overloaded technicians",
  "wo.sug.available": "Available technicians",
  "wo.rec.title": "Recommended technician",
  "wo.rec.reasons": "Why this technician",
  "wo.rec.skill": "Skill match",
  "wo.rec.similar": "Similar job experience",
  "wo.rec.load": "Current workload",
  "wo.rec.avail": "Availability",
  "wo.rec.near": "Proximity to location",
  "wo.rec.conflict": "Conflict check",
};

export const DICT: Record<Lang, Dict> = { tr, en };

// Suggested AI questions per mode (maintenance-focused).
export const MODE_PROMPTS: Record<Lang, Record<string, string[]>> = {
  tr: {
    general: [
      "Son 30 günde en çok tekrar eden arıza ne?",
      "Hangi ekipmanlarda aynı parça tekrar değişmiş?",
      "Bugün açık kritik iş emirleri neler?",
      "Kaplin hizalama gerektiren açık işler hangileri?",
    ],
    quality: [
      "Fotoğraf kanıtı olmadan kapatılan iş emirlerini göster.",
      "Hangi tesislerde kapanış kalitesi en düşük?",
      "Hangi arıza tipleri teknisyen eğitim ihtiyacı oluşturuyor?",
    ],
    compliance: [
      "Bakım prosedürüyle çelişen kapanışlar var mı?",
      "Zorunlu ölçüm/kanıt eksik iş emirlerini göster.",
      "LOTO adımı atlanmış işleri listele.",
    ],
    audit: [
      "Kapandıktan sonra yeniden açılan iş emirleri hangileri?",
      "Geçen hafta kapalı iş emirlerini kim düzenledi?",
      "Hangi teknisyenin iş yükü en yüksek?",
    ],
    storefile: [
      "Pompa P-204 ekipman dosyasını özetle.",
      "Bu ekipmanda son 12 ayda tekrar eden arızalar hangileri?",
      "Yedek parça değişim geçmişini çıkar.",
      "Kaplin hizalama işlemlerinin özetini ver.",
      "Bu ekipman için önerilen önleyici bakım planını oluştur.",
    ],
  },
  en: {
    general: [
      "What is the most recurring fault in the last 30 days?",
      "Which equipment had the same part replaced repeatedly?",
      "What are today's open critical work orders?",
      "Which open jobs require coupling alignment?",
    ],
    quality: [
      "Show work orders closed without photo evidence.",
      "Which facilities have the lowest closure quality?",
      "Which fault types create technician training needs?",
    ],
    compliance: [
      "Are there closures that conflict with the maintenance procedure?",
      "Show work orders missing mandatory measurements/evidence.",
      "List jobs where a LOTO step was skipped.",
    ],
    audit: [
      "Which work orders were reopened after closing?",
      "Who edited closed work orders last week?",
      "Which technician has the highest workload?",
    ],
    storefile: [
      "Summarize the equipment file for pump P-204.",
      "What recurring faults appear on this equipment in the last 12 months?",
      "Extract the spare-part replacement history.",
      "Give a summary of coupling alignment jobs.",
      "Propose a preventive maintenance plan for this equipment.",
    ],
  },
};

export const MODE_PLACEHOLDER: Record<Lang, Record<string, string>> = {
  tr: {
    general: "İş emirleri, arızalar, ekipmanlar, teknisyenler veya geçmiş bakımlar hakkında sorun…",
    quality: "Eksik alanlar, kanıtsız kapanış veya veri kalitesi hakkında sorun…",
    compliance: "Prosedür uyumu, zorunlu kanıt veya uygunsuzluk hakkında sorun…",
    audit: "Kim neyi ne zaman ve neden değiştirdi diye sorun…",
    storefile: "Ekipman dosyası, arıza geçmişi, yedek parça ve bakım planı hakkında sorun…",
  },
  en: {
    general: "Ask about work orders, faults, equipment, technicians or past maintenance…",
    quality: "Ask about missing fields, evidence-less closures or data quality…",
    compliance: "Ask about SOP adherence, mandatory evidence or non-compliance…",
    audit: "Ask who changed what, when and why…",
    storefile: "Ask about equipment files, fault history, spare parts and maintenance plans…",
  },
};

export const MODE_DESCRIPTION: Record<Lang, Record<string, string>> = {
  tr: {
    general: "Bakım kayıtlarını ve iş emirlerini ara ve özetle",
    quality: "Eksik, tutarsız veya düşük kaliteli kayıtları bul",
    compliance: "İş emirlerini prosedürlere ve zorunlu alanlara göre kontrol et",
    audit: "Kimin neyi ne zaman değiştirdiğini incele",
    storefile: "Ekipman dosyası, arıza geçmişi, yedek parça ve bakım kararlarını analiz et.",
  },
  en: {
    general: "Search and summarise maintenance records and work orders",
    quality: "Find incomplete, inconsistent or low-quality records",
    compliance: "Check work orders against procedures and mandatory fields",
    audit: "Review who changed what and when",
    storefile: "Analyze equipment files, fault history, spare parts and maintenance decisions.",
  },
};

export function translate(lang: Lang, key: string): string {
  return DICT[lang]?.[key] ?? DICT[DEFAULT_LANG][key] ?? key;
}

// ---- Dashboard demo data (maintenance central office) ----
export type DemoMetric = { value: string; label: string };

export const DEMO_METRICS: Record<Lang, DemoMetric[]> = {
  tr: [
    { value: "342", label: "Açık iş emri" },
    { value: "128", label: "Atanan iş emri" },
    { value: "46", label: "Beklemede olan iş" },
    { value: "512", label: "Tamamlanan iş (30g)" },
    { value: "18", label: "Tekrar eden arıza" },
    { value: "124 saat", label: "Kurtarılan yönetici zamanı" },
  ],
  en: [
    { value: "342", label: "Open work orders" },
    { value: "128", label: "Assigned work orders" },
    { value: "46", label: "Waiting jobs" },
    { value: "512", label: "Completed (30d)" },
    { value: "18", label: "Recurring faults" },
    { value: "124 h", label: "Manager time saved" },
  ],
};

export type FlowItem = {
  name: string;
  message: string;
  event: string;
  location: string;
  priority: string;
  action: string;
};

export const DEMO_FIELD_FLOW: Record<Lang, FlowItem[]> = {
  tr: [
    {
      name: "Ayşe · Gebze Fabrikası",
      message: "Pompa P-204'te yüksek titreşim ve ses var.",
      event: "Pompa arızası",
      location: "Gebze · Hat 2",
      priority: "Yüksek",
      action: "İş emri açıldı, Ahmet Y. atandı",
    },
    {
      name: "Mehmet · İzmir Tesisi",
      message: "Konveyör rulmanı sıcaklığı 78°C.",
      event: "Rulman aşırı ısınma",
      location: "İzmir · Paketleme",
      priority: "Yüksek",
      action: "Önleyici bakım iş emri oluşturuldu",
    },
    {
      name: "Zeynep · Bursa Fabrikası",
      message: "Kompresör basıncı düşüyor, hava kaçağı var.",
      event: "Hava kaçağı",
      location: "Bursa · Utility",
      priority: "Orta",
      action: "Kontrol iş emri açıldı",
    },
    {
      name: "Emir · Kocaeli Tesisi",
      message: "Elektrik panosunda alarm veriyor.",
      event: "Pano alarmı",
      location: "Kocaeli · Ana Pano",
      priority: "Yüksek",
      action: "Elektrik teknisyeni yönlendirildi",
    },
  ],
  en: [
    {
      name: "Ayşe · Gebze Plant",
      message: "Pump P-204 has high vibration and noise.",
      event: "Pump fault",
      location: "Gebze · Line 2",
      priority: "High",
      action: "Work order opened, assigned to Ahmet Y.",
    },
    {
      name: "Mehmet · Izmir Facility",
      message: "Conveyor bearing temperature at 78°C.",
      event: "Bearing overheat",
      location: "Izmir · Packaging",
      priority: "High",
      action: "Preventive work order created",
    },
    {
      name: "Zeynep · Bursa Plant",
      message: "Compressor pressure dropping, air leak suspected.",
      event: "Air leak",
      location: "Bursa · Utility",
      priority: "Medium",
      action: "Inspection work order opened",
    },
    {
      name: "Emir · Kocaeli Facility",
      message: "Main electrical panel is alarming.",
      event: "Panel alarm",
      location: "Kocaeli · Main Panel",
      priority: "High",
      action: "Electrical technician dispatched",
    },
  ],
};

export type RecurringItem = { topic: string; detail: string };

export const DEMO_RECURRING: Record<Lang, RecurringItem[]> = {
  tr: [
    { topic: "Pompa titreşimi", detail: "24 iş emri" },
    { topic: "Rulman aşırı ısınma", detail: "18 iş emri" },
    { topic: "Hava kaçağı", detail: "15 iş emri" },
    { topic: "Kaplin hizalama", detail: "11 iş emri" },
    { topic: "Elektrik pano alarmı", detail: "9 iş emri" },
  ],
  en: [
    { topic: "Pump vibration", detail: "24 work orders" },
    { topic: "Bearing overheat", detail: "18 work orders" },
    { topic: "Air leak", detail: "15 work orders" },
    { topic: "Coupling alignment", detail: "11 work orders" },
    { topic: "Panel alarm", detail: "9 work orders" },
  ],
};

export const PRIORITY_CLASS: Record<string, string> = {
  Yüksek: "bg-primary/10 text-primary",
  High: "bg-primary/10 text-primary",
  Orta: "bg-amber-100 text-amber-800",
  Medium: "bg-amber-100 text-amber-800",
};

// Maintenance-focused data source cards
export type SourceItem = { title: string; text: string; status: "Connected" | "Syncing" | "Setup" };

export const DS_WHATSAPP: Record<Lang, SourceItem[]> = {
  tr: [
    { title: "Saha Bildirim Mesajları", text: "Tesis ekiplerinden gelen arıza ve talep mesajları.", status: "Connected" },
    { title: "Sesli Notlar", text: "Teknisyenlerin sesli mesaj ve saha notları.", status: "Syncing" },
    { title: "Fotoğraf ve Ölçümler", text: "Sahadan paylaşılan fotoğraf, termal görüntü ve ölçüm dosyaları.", status: "Connected" },
  ],
  en: [
    { title: "Field Alert Messages", text: "Fault and request messages from facility teams.", status: "Connected" },
    { title: "Voice Notes", text: "Technician voice messages and field notes.", status: "Syncing" },
    { title: "Photos & Measurements", text: "Photos, thermal images and measurement files from the field.", status: "Connected" },
  ],
};

export const DS_KNOWLEDGE: Record<Lang, SourceItem[]> = {
  tr: [
    { title: "Bakım Prosedürleri PDF", text: "Güncel önleyici ve düzeltici bakım talimatları.", status: "Connected" },
    { title: "Ekipman El Kitapları", text: "Üretici manuel ve teknik dokümanları.", status: "Connected" },
    { title: "LOTO Prosedürü", text: "Kilitleme/etiketleme güvenlik adımları.", status: "Setup" },
    { title: "Yedek Parça Katalogları", text: "Parça kodları, stok ve tedarikçi bilgileri.", status: "Syncing" },
  ],
  en: [
    { title: "Maintenance Procedures PDF", text: "Current preventive and corrective maintenance instructions.", status: "Connected" },
    { title: "Equipment Manuals", text: "Vendor manuals and technical documentation.", status: "Connected" },
    { title: "LOTO Procedure", text: "Lockout/tagout safety steps.", status: "Setup" },
    { title: "Spare Parts Catalogs", text: "Part codes, stock and supplier information.", status: "Syncing" },
  ],
};

export const DS_OPERATIONS: Record<Lang, SourceItem[]> = {
  tr: [
    { title: "CMMS", text: "İş emri, ekipman ve bakım planı verisi.", status: "Connected" },
    { title: "SCADA / IoT", text: "Sensör verileri, alarm ve durum bilgileri.", status: "Syncing" },
    { title: "ERP / Stok Sistemi", text: "Yedek parça stoğu ve satın alma verisi.", status: "Setup" },
    { title: "Ticket / Görev Sistemi", text: "Açık talepler ve iş takibi.", status: "Setup" },
  ],
  en: [
    { title: "CMMS", text: "Work order, equipment and maintenance plan data.", status: "Connected" },
    { title: "SCADA / IoT", text: "Sensor data, alarms and status information.", status: "Syncing" },
    { title: "ERP / Stock System", text: "Spare part stock and purchasing data.", status: "Setup" },
    { title: "Ticket / Task System", text: "Open requests and job tracking.", status: "Setup" },
  ],
};

// ---- Field channel structure demo (frontend-only) ----
export type ChannelCard = { title: string; detail: string; status: string };

export const WA_CHANNELS: Record<Lang, ChannelCard[]> = {
  tr: [
    { title: "Türkiye Saha Kanalı", detail: "12 tesis · Arıza, bakım talebi, fotoğraf ve ölçüm", status: "Demo" },
    { title: "Romanya Saha Kanalı", detail: "4 tesis · Yerel bakım operasyonları", status: "Bağlı değil" },
    { title: "Kazakistan Saha Kanalı", detail: "3 tesis · Yerel dilde saha destek akışı", status: "Yakında" },
    { title: "Yönetici Bilgi Güncelleme Kanalı", detail: "Prosedür, talimat ve doküman güncellemeleri", status: "Onay akışı" },
  ],
  en: [
    { title: "Türkiye Field Channel", detail: "12 facilities · Faults, maintenance requests, photos, measurements", status: "Demo" },
    { title: "Romania Field Channel", detail: "4 facilities · Local maintenance operations", status: "Not connected" },
    { title: "Kazakhstan Field Channel", detail: "3 facilities · Local-language field support flow", status: "Coming soon" },
    { title: "Admin Knowledge Update Channel", detail: "Procedure, instruction and document updates", status: "Approval flow" },
  ],
};

// ---- Phone → role/location mapping demo ----
export type PhoneMapping = { phone: string; mapping: string };

export const PHONE_MAPPINGS: Record<Lang, PhoneMapping[]> = {
  tr: [
    { phone: "+90 5XX XXX XX XX", mapping: "Bakım Şefi · Türkiye · Gebze Fabrikası" },
    { phone: "+40 7XX XXX XXX", mapping: "Bölge Bakım Müdürü · Romanya · Bükreş" },
    { phone: "+90 5XX XXX XX XX", mapping: "Merkez Operasyon · Yönetici Bilgi Güncelleme" },
  ],
  en: [
    { phone: "+90 5XX XXX XX XX", mapping: "Maintenance Lead · Türkiye · Gebze Plant" },
    { phone: "+40 7XX XXX XXX", mapping: "Regional Maint. Manager · Romania · Bucharest" },
    { phone: "+90 5XX XXX XX XX", mapping: "HQ Operations · Admin Knowledge Update" },
  ],
};

// ---- Knowledge update drafts demo ----
export type KnowledgeDraft = { title: string; meta: string; ai: string; ready: boolean };

export const KNOWLEDGE_DRAFTS: Record<Lang, KnowledgeDraft[]> = {
  tr: [
    { title: "Pompa Bakım Talimatı v3.pdf", meta: "Türkiye · Tüm tesisler · Onay bekliyor", ai: "Bakım adımları, tork değerleri ve LOTO gereksinimleri algılandı.", ready: false },
    { title: "Kaplin Hizalama Prosedürü.docx", meta: "Romanya · Seçili tesisler · Onay bekliyor", ai: "Önceki prosedürle olası çakışma bulundu.", ready: false },
    { title: "LOTO Talimatı.pdf", meta: "Tüm ülkeler · Yayına hazır", ai: "Prosedür özeti ve rol kapsamı çıkarıldı.", ready: true },
  ],
  en: [
    { title: "Pump Maintenance Instruction v3.pdf", meta: "Türkiye · All facilities · Pending approval", ai: "Maintenance steps, torque values and LOTO requirements detected.", ready: false },
    { title: "Coupling Alignment Procedure.docx", meta: "Romania · Selected facilities · Pending approval", ai: "Possible conflict with the previous procedure found.", ready: false },
    { title: "LOTO Instruction.pdf", meta: "All countries · Ready to publish", ai: "Procedure summary and role scope extracted.", ready: true },
  ],
};
