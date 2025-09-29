import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Service } from '../types';
import { investorGuideText, alTurkiLawFirmInfoText } from '../services/investor_guide';

interface ServiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: Service;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const ServiceAssistantModal: React.FC<ServiceAssistantModalProps> = ({ isOpen, onClose, service }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const title = service ? `مساعد خدمة: ${service.name}` : 'المساعد الاستثماري';
  const initialMessage = service
    ? `أهلاً بك! أنا هنا للإجابة على أسئلتك بخصوص خدمة "${service.name}" بالاعتماد على الأنظمة والقوانين المعتمدة. كيف يمكنني مساعدتك؟`
    : `أهلاً بك! أنا المساعد الاستثماري لمكتب محمد التركي للمحاماة. كيف يمكنني مساعدتك اليوم في رحلتك الاستثمارية بالمملكة؟`;


  useEffect(() => {
    if (isOpen) {
      setChatHistory([
        {
          role: 'model',
          text: initialMessage
        }
      ]);
      setUserInput('');
      setError(null);
    }
  }, [isOpen, service, initialMessage]);

  useEffect(() => {
    // Scroll to bottom of chat on new message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', text: userInput };
    setChatHistory(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const systemInstruction = `أنت مساعد معرفي لموقع رسمي. وظيفتك هي الاعتماد على الملفات المرفوعة فقط (سياسات، أدلة، عقود، لوائح، عروض، جداول…) للبحث والإجابة.
ممنوع منعًا باتًا تعديل أو تحديث أي محتوى في الموقع أو الاستنتاج من خارج هذه الملفات.
أسلوب الإجابة
نبرة: رسمية، قانونية، استثمارية، تجارية، احترافية ومختصرة.
اللغة: العربية الفصحى (واستخدم الإنجليزية فقط إذا كان سؤال المستخدم بالإنجليزية أو طلب ذلك صراحة).
البنية:
خلاصة تنفيذية موجزة من سطرين–أربعة.
تفصيل منظم بعناوين فرعية.
متطلبات/خطوات/اشتراطات (إن وجدت).
تنبيه قانوني مختصر عند الحاجة.
مراجع داخلية: اذكر اسم الملف والعنوان/القسم ورقم الصفحة أو الفقرة إن توفر. صيغة الاستشهاد:
المصدر: [اسم الملف] – [القسم/العنوان] – [صفحة/فقرة].
قواعد المعرفة والحدود
اعتمد على الملفات المرفوعة فقط. إذا لم تجد معلومة كافية:
قل: "لا تتوفر معلومة كافية في الملفات المرفوعة."
واقترح ما الذي يحتاجه المستخدم لزيادة الدقة (اسم مستند، فصل، تاريخ).
عند وجود تعارض بين الملفات, قدّم الأحدث تاريخًا أو الأكثر رسمية (تشريع/لائحة/عقد → يتقدم على عرض تسويقي)، واذكر سبب الترجيح.
إن كان السؤال خارج نطاق الملفات أو يتطلب رأيًا قانونيًا ملزمًا:
قدّم تفسيرًا عامًا استرشاديًا من الملفات (إن وُجد)،
ثم أضف تنبيهًا: "هذه الإجابة معلوماتية وليست استشارة قانونية ملزمة."
لا تستخدم معلومات عامة من الويب ولا أمثلة من خارج المستندات ما لم يُصرَّح بذلك.
تنسيق خاص بالاستثمار/القانون/التجارة
ضع تعريفات مختصرة للمصطلحات النظامية عند أول ورود (إن وُجدت بالملفات).
عند ذكر متطلبات/إجراءات: اعرضها كقائمة مرقّمة، واذكر الجهة/النموذج/المدة إن توفرت بالملفات.
للأرقام والتواريخ: استخدم صيغة دقيقة كما وردت بالملفات، واذكر تاريخ النفاذ إن كان منصوصًا.
إذا احتاج الجواب قالب خطاب/نص رسمي: أنشئ مسودة مبنية حصريًا على الصيغ الواردة بالملفات واذكر مصدر الصيغة.
أمثلة تصرّف
إذا سُئلت: "ما المتطلبات؟"
أعطِ قائمة مرتبة بالمستندات/الخطوات مع الاستشهاد بكل نقطة.
إذا سُئلت: "هل هذا مسموح؟"
استشهد بالنص النظامي من الملف مع رقم المادة/الفقرة، ثم قدّم خلاصة تفسيرية قصيرة.
إذا كان المطلوب خارج الملفات:
"لا توجد إشارة لهذا الموضوع في الملفات المرفوعة. يُرجى تزويدي بـ[اسم المستند/القسم] لاستكمال الإجابة."
مخرجات يجب تجنّبها
أي تحديث أو إعادة كتابة لمحتوى الموقع.
أي أحكام قطعية بلا سند من ملف.
عبارات إنشائية أو تسويقية غير مدعومة من الوثائق.`;

      const serviceContext = service ? `
        السياق الحالي: المستخدم يسأل عن خدمة محددة.
        - اسم الخدمة الحالية: ${service.name}
        - الجهة المسؤولة: ${service.agency}
        - وصف الخدمة: ${service.shortDescription}
        - المستندات المطلوبة لهذه الخدمة: ${service.documents.join('، ')}
        - الشروط: ${service.conditions.join('، ')}
      ` : `
        السياق الحالي: المستخدم يسأل سؤالاً عاماً عن الاستثمار في المملكة العربية السعودية.
      `;

      const userContent = `
        الوثائق المرجعية:
        --- بداية معلومات مكتب محمد التركي للمحاماة ---
        ${alTurkiLawFirmInfoText}
        --- نهاية معلومات مكتب محمد التركي للمحاماة ---

        --- بداية دليل المستثمر ---
        ${investorGuideText}
        --- نهاية دليل المستثمر ---
        
        ${serviceContext}
        سؤال المستخدم: "${userInput}"

        الرجاء تقديم إجابة بناءً على التعليمات والوثائق المرجعية.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userContent,
        config: {
            systemInstruction: systemInstruction
        }
      });

      const modelResponse: ChatMessage = { role: 'model', text: response.text };
      setChatHistory(prev => [...prev, modelResponse]);

    } catch (err) {
      console.error("Gemini API error:", err);
      const errorMessage = "عذراً، حدث خطأ أثناء محاولة الحصول على إجابة. الرجاء المحاولة مرة أخرى.";
      setError(errorMessage);
      setChatHistory(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="auth-modal-panel w-full max-w-2xl rounded-2xl shadow-2xl text-slate-200 flex flex-col h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-700/50 flex justify-between items-center flex-shrink-0">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/30 m-4 rounded-lg">
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                  message.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-lg'
                    : 'bg-slate-700 text-slate-200 rounded-bl-lg'
                }`}
              >
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
                <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm bg-slate-700">
                    <div className="flex items-center space-i-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 flex-shrink-0">
          {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
          <form onSubmit={handleSendMessage} className="flex items-center space-i-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="اطرح سؤالك هنا..."
              className="auth-modal-input flex-1 w-full px-4 py-3 rounded-full shadow-sm"
              disabled={isLoading}
              aria-label="اطرح سؤالك هنا"
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="bg-emerald-600 text-white rounded-full p-3 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 shadow-md"
              aria-label="إرسال"
            >
              <svg className="w-6 h-6 transform -rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceAssistantModal;