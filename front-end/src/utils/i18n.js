// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      Login: "Login",
      Register: "Register",
      Search : "Search",
      Categories: "Categories",
      addtocart: "Add to Card",
      Stock: "Stock",
      Price: "Price",
      rights1: "© 2024 Rasool Hussein. All Rights Reserved.",
      rights2: "All content provided on this website is for informational purposes only.",
      rights3: "The owner is not responsible for any misuse of the content.",
      rights4: "This project is protected by copyright laws.",
      rights5: "Unauthorized use, distribution, or reproduction is prohibited.",
      TotalPrice: "Total price",
      About: "About",
      NoProductsInCarts: "No Products In Carts",
      Delete: "Delete",
      Send: "Send",

    }
  },
  ar: {
    translation: {
      Login: "تسجيل الدخول",
      Register: "تسجيل",
      Search : "ابحث",
      Categories: "الفئات",
      addtocart: "اضافة الى السلة",
      Stock: "المخزون",
      Price: "السعر",
      rights1: "© 2024 .رسول حسين كل حقوق محفوظة",
      rights2: ".جميع المحتويات المقدمة على هذا الموقع هي لأغراض معلوماتية فقط",
      rights3: ".المالك غير مسؤول عن أي إساءة استخدام للمحتوى",
      rights4: ".هذا المشروع محمي بموجب قوانين حقوق النشر",
      rights5: ".يُمنع الاستخدام أو التوزيع أو النسخ غير المصرح به",
      TotalPrice: "السعر الكلي",
      About: "حول المنتج",
      NoProductsInCarts: "لا توجد منتجات في السلة",
      Delete: "حذف",
      Send: "إرسال",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;