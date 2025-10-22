// ContactForm.jsx
"use client";

import styles from "./Contact.module.css";

// ContactForm.jsx

// ContactForm.jsx

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // منطق ارسال فرم (مثل ارسال به API)
    console.log("Form submitted from Client Component!");
  };

  return (
    <div className={`${styles.card} ${styles.formCard}`}>
      <h2 className={styles.formTitle}>فرم تماس</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="contact-name" className={styles.label}>
            نام و نام خانوادگی
          </label>
          <input id="contact-name" type="text" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            ایمیل
          </label>
          <input id="contact-email" type="email" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact-subject" className={styles.label}>
            موضوع
          </label>
          <input id="contact-subject" type="text" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact-message" className={styles.label}>
            پیام
          </label>
          <textarea id="contact-message" rows={5} className={styles.textarea} />
        </div>
        <button type="submit" className={styles.button}>
          ارسال پیام
        </button>
      </form>
    </div>
  );
}
