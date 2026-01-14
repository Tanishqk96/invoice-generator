import React from "react";
import { footerStyles } from "../assets/dummyStyles";

export default function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.copyright}>
          © {new Date().getFullYear()} InvoiceIt · Built by Tanishq
        </div>
      </div>
    </footer>
  );
}
