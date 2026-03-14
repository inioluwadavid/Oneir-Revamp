/**
 * FAQ content for Common Questions page.
 * Category keys match translation keys in locales/common-questions/*.json
 */

import type { Locale } from "@/lib/translations";
import { commonQuestionsDataFr } from "./common-questions-fr";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSubcategory {
  subcategoryKey: string;
  items: FAQItem[];
}

export interface FAQCategory {
  categoryKey: string;
  /** Optional subcategories (e.g. EFT under Purchasing) */
  subcategories?: FAQSubcategory[];
  /** Direct items when no subcategories */
  items?: FAQItem[];
}

export const commonQuestionsData: FAQCategory[] = [
  {
    categoryKey: "cloudHosting",
    items: [
      {
        question: "How do users connect to Oneir in the cloud?",
        answer:
          "Users connect securely through a terminal connection to the Oneir cloud server. Your team will receive the required connection details and recommended settings to ensure a stable experience.",
      },
      {
        question: "Can Oneir run in a virtual machine (VM)?",
        answer:
          "Yes. Oneir supports common virtual environments including VMware options used by many clients.",
      },
      {
        question: "How do I enter my Telnet98 license key?",
        answer:
          "In Telnet98, go to Options → License and enter your key. Copy/paste is recommended to avoid typing errors.",
      },
    ],
  },
  {
    categoryKey: "serverVmware",
    items: [
      {
        question: "What server setup does Oneir require at Head Office?",
        answer:
          "Head Office requires a Oneir server running Linux. Many clients install Oneir inside a VMware virtual machine on an existing underutilized server.",
      },
      {
        question: "Can Oneir run inside VMware?",
        answer:
          "Yes. Oneir can run inside VMware Server on a Windows Server or Linux host. The Oneir virtual machine is isolated from other VMs and the host, improving stability.",
      },
      {
        question: "How many virtual machines are recommended?",
        answer:
          "Oneir recommends no more than two installations on the host: Oneir Linux and one Microsoft Windows VM (if required).",
      },
      {
        question: "What are the minimum hardware requirements?",
        answer:
          "Memory: 512 MB minimum; 4 GB recommended. Hard drive: ~20 GB for the Oneir VM. (Additional resources may be required depending on other VMs.)",
      },
      {
        question: "What operating systems are supported for the VMware host?",
        answer:
          "Supported: Windows Server 2003 (server editions only) and Linux hosts. Desktop OS versions are not recommended.",
      },
      {
        question: "Can CentOS be used as a host operating system?",
        answer:
          "Yes. CentOS is compatible with Red Hat Enterprise Linux and has been used successfully by Oneir customers.",
      },
      {
        question: "Is a static IP address required?",
        answer:
          "A static external IP is recommended. A dynamic IP can be used with dynamic DNS for single-location setups if properly protected behind a router/firewall.",
      },
      {
        question: "Why is a baseline utilization test required?",
        answer:
          "It confirms the host server has enough available resources and is not heavily utilized during business hours before VMware is installed.",
      },
      {
        question: "How does VMware protect the Oneir server?",
        answer:
          "VMware isolates the Oneir VM from the host OS and other virtual machines. If one VM crashes, others remain unaffected. VM files are also easier to back up and migrate.",
      },
    ],
  },
  {
    categoryKey: "printingForms",
    items: [
      {
        question: "What printers are required to print forms with logos?",
        answer:
          "To print forms that include logos, your printer must support PostScript. For plain reports, printers should support PCL6. POS receipt printing requires an ESC/POS compatible receipt printer.",
      },
      {
        question: "Why do print jobs sometimes get stuck?",
        answer:
          "Many printers enter sleep/power-saving mode and may not reliably wake when a job is sent. Adjust sleep settings or wake the printer before printing.",
      },
      {
        question: "What is WatchFolder?",
        answer:
          'WatchFolder automatically opens Oneir reports/forms in your PDF viewer when you print to "Display PDF on screen."',
      },
      {
        question: "How do I share a printer for use with Oneir?",
        answer:
          "Printers must be properly shared on the network and accessible from the workstation running Oneir. Ensure the shared printer name matches the configuration in printing setup.",
      },
    ],
  },
  {
    categoryKey: "purchasingAccountsPayable",
    subcategories: [
      {
        subcategoryKey: "eft",
        items: [
          {
            question: "Does Oneir support Electronic Funds Transfer (EFT) payments to vendors?",
            answer:
              "Yes. Oneir supports EFT payments to vendors, reducing the need for printed cheques.",
          },
          {
            question: "What are the benefits of EFT instead of cheques?",
            answer:
              "EFT reduces lost cheques, printing/mailing costs, clerical errors, and improves vendor satisfaction. It can also simplify reconciliation.",
          },
          {
            question: "Which banks are supported for EFT?",
            answer:
              "TD, RBC, Scotiabank, BMO, CIBC, National Bank. Royal Bank also supports U.S. funds format.",
          },
          {
            question: "What information is required to set up EFT?",
            answer:
              "A void cheque (bank/transit/account numbers) and your client number / Originator ID provided by your bank.",
          },
          {
            question: "Can Oneir generate EFT remittance notices?",
            answer:
              "Yes. Remittance notices can include invoice references, amounts paid, and payment confirmation details.",
          },
        ],
      },
      {
        subcategoryKey: "multiCurrencyPurchasing",
        items: [
          {
            question: "Does Oneir support multiple currencies?",
            answer:
              "Yes. Oneir supports up to 18 foreign currencies for Purchasing and Accounts Payable, with exchange rate conversion to domestic currency.",
          },
          {
            question: "How do I activate additional currencies?",
            answer:
              "Log in with a Level 9 password → Initialization → Update Exchange Rates → enter currency code and rate → save. Then use the currency code on the Vendor or Purchase Order.",
          },
        ],
      },
    ],
  },
  {
    categoryKey: "purchaseOrdersReceiving",
    items: [
      {
        question: "Can Oneir automatically generate Purchase Orders?",
        answer:
          "Yes. Oneir can generate POs automatically based on stock levels and minimum quantities.",
      },
      {
        question: "What is the Purchase Order Guide feature?",
        answer:
          "The PO Guide suggests purchase orders based on past sales activity over a defined time period. You remain in full control of quantities.",
      },
      {
        question: "Does Oneir support container receiving and landed cost calculations?",
        answer:
          "Yes. Container Receiving supports multiple POs per container, multiple currencies, and distributes freight/duty/handling costs (landed cost) by weight percentage.",
      },
      {
        question: "Can Purchase Orders be created in foreign currencies?",
        answer:
          "Yes. POs should be created in the vendor's invoicing currency so conversion and landed costs work correctly.",
      },
    ],
  },
  {
    categoryKey: "inventoryManufacturing",
    subcategories: [
      {
        subcategoryKey: "bom",
        items: [
          {
            question: "Does Oneir support Bills of Materials (BOM)?",
            answer:
              "Yes. Oneir supports a full BOM system including multi-phase production, standard costing, FIFO costing, sub-assemblies, and labour/setup costs.",
          },
          {
            question: "Can Oneir support product bundling or promotions?",
            answer:
              "Yes. Oneir supports Mix & Match pricing, Tag Along promotions, and Kitting.",
          },
        ],
      },
      {
        subcategoryKey: "interdivisionalStockTransfer",
        items: [
          {
            question: "What is Interdivisional Stock Transfer?",
            answer:
              "It allows one division to request stock from another, tracks inventory \"In Transit,\" and transfers inventory value through the General Ledger.",
          },
          {
            question: "Can stock transfers exceed quantity on hand?",
            answer:
              "Yes. The newer transfer module supports transfers exceeding current on-hand quantities (negative inventory position), unlike the older method.",
          },
          {
            question: "How are transfers tracked in the General Ledger?",
            answer:
              "Inventory value moves through an Inventory Transfer Account while in transit, and transfers into receiving inventory upon receipt.",
          },
        ],
      },
      {
        subcategoryKey: "yearEndStockCount",
        items: [
          {
            question: "How do I import year-end stock count quantities from a portable scanner?",
            answer:
              "Inventory Management Menu → Stocktaking Menu → Upload portable data collector quantities → select pn_qtyho.tab → apply quantities to the correct division.",
          },
          {
            question: "What if pn_qtyho.tab does not appear?",
            answer:
              "Confirm the file downloaded successfully and is located in the correct company data folder. If not, contact support.",
          },
          {
            question: "When should I use this feature?",
            answer:
              "Year-end stock counts, full physical counts, and periodic warehouse audits.",
          },
        ],
      },
    ],
  },
  {
    categoryKey: "accountsReceivable",
    subcategories: [
      {
        subcategoryKey: "statements",
        items: [
          {
            question: "Can Oneir email statements with invoice copies?",
            answer:
              "Yes. Balance Forward statements can include PDF copies of invoices and credit notes in a single attachment per customer.",
          },
          {
            question: "How do I enable statements with invoice copies?",
            answer:
              "This is controlled by the customer's statement setting (certain options enable invoice copies).",
          },
          {
            question: "Why didn't invoice copies attach to my statement email?",
            answer:
              "Common reasons include: Statement type isn't Balance Forward; Customer isn't configured for invoice copies; No invoices/credit notes in the statement period.",
          },
        ],
      },
      {
        subcategoryKey: "exportingCustomerEmails",
        items: [
          {
            question: "How do I export customer email addresses from Oneir?",
            answer:
              "Accounts Receivable → Accounts Receivable Report Menu → Print Customer Master Listing → \"Print email addresses?\" = Y → \"Export email addresses to a file?\" = Y → choose a folder → open in Excel.",
          },
        ],
      },
    ],
  },
  {
    categoryKey: "refundsCreditsWriteoffs",
    items: [
      {
        question: "How do I write off a customer's outstanding balance?",
        answer:
          "Post a manual credit/debit adjustment against the invoice/credit note being written off and post the write-off to the appropriate GL account (often bad debt).",
      },
      {
        question: "How do I refund a customer by cheque?",
        answer:
          "Step 1: Clear the AR credit using a manual debit and a clearing GL account. Step 2: Issue a cheque in AP using vendor code \"CASH,\" posting to the same clearing account and correct bank.",
      },
      {
        question: "How do I refund a customer by credit card?",
        answer:
          "Ensure a credit exists → post a manual debit in AR referencing the credit note → post refund to the GL account used for credit card deposits.",
      },
    ],
  },
  {
    categoryKey: "financeChargesInterest",
    items: [
      {
        question: "Can Oneir post finance charges to Accounts Receivable?",
        answer:
          "Yes. Oneir can calculate and post finance charges to AR and GL. Finance charge invoices are created in the format YYMMFC.",
      },
      {
        question: "How are finance charges calculated?",
        answer:
          "Requires customer statement option \"Print Statement with Finance Charge.\" Oneir calculates days overdue based on invoice date, statement date, and terms, applies an interest factor, and calculates using the monthly rate.",
      },
      {
        question: "Can I preview finance charges before posting?",
        answer:
          "Yes. Print the Finance Charge Report to review charges. (Note: you must exit the program after selecting the report option for it to print.)",
      },
      {
        question: "Can finance charges be reversed?",
        answer:
          "Yes. Accounts Receivable → Reverse finance charges → enter the finance charge invoice number. Reversals post to both AR and GL automatically.",
      },
    ],
  },
  {
    categoryKey: "generalLedgerProcedures",
    subcategories: [
      {
        subcategoryKey: "monthEndYearEnd",
        items: [
          {
            question: 'What does "Date is outside three fiscal years" mean?',
            answer:
              "It indicates a year-end close is required in General Ledger before continuing in the current fiscal period.",
          },
          {
            question: "What must I do before running Year-End Closing?",
            answer:
              "Ensure all users are out; Take a full backup; Print required reports for the year being removed; Run Year-End Closing; Verify fiscal periods afterward.",
          },
        ],
      },
      {
        subcategoryKey: "balancingArToGl",
        items: [
          {
            question: "How do I balance Accounts Receivable to the General Ledger?",
            answer:
              "Confirm whether deposits and receivables post to the same GL account and whether POS customer \"CASH\" is used. Then balance using one of two methods (combined or separate receivables/deposits). Important: POS \"CASH\" outstanding deposits do not appear on standard AR reports and cannot be backdated; print required POS reports on the date you balance.",
          },
        ],
      },
    ],
  },
  {
    categoryKey: "pointOfSale",
    items: [
      {
        question: "Does Oneir support Gift Certificates?",
        answer:
          "Yes. Gift certificates can be sold and redeemed with proper GL and AR posting. Gift certificates must be sold to a customer record (not a cash sale).",
      },
      {
        question: "How are gift certificates redeemed?",
        answer:
          "Process a customer sale → select Gift Certificate payment method → complete the transaction. Certificates must be sold before they can be redeemed.",
      },
    ],
  },
  {
    categoryKey: "securityPermissions",
    subcategories: [
      {
        subcategoryKey: "userSecurityLevels",
        items: [
          {
            question: "How do password security levels work in Oneir?",
            answer:
              "Oneir uses a 9-level security hierarchy. Each level includes permissions from lower levels, and higher levels unlock pricing, margin, financial utilities, and initialization functions.",
          },
          {
            question: "Who should have Level 9 access?",
            answer:
              "Level 9 should be restricted to senior management only because it includes system initialization and full utilities across modules.",
          },
        ],
      },
      {
        subcategoryKey: "pciCompliance",
        items: [
          {
            question: "What is PCI Compliance?",
            answer:
              "PCI DSS is the payment card industry security standard for protecting cardholder data. Merchants must validate compliance annually.",
          },
          {
            question: "What is PCI Compliance Manager?",
            answer:
              "An online portal managed by Sysnet Global Solutions that helps merchants complete SAQs, run scans (if required), submit documents, and track compliance status.",
          },
          {
            question: "When must PCI compliance be completed?",
            answer:
              "Within 90 days of activation, and annually thereafter. Non-compliance may result in a monthly fee of $59.99 until validated.",
          },
          {
            question: "What are the steps to validate PCI compliance?",
            answer:
              "Personalize account; Complete business profile; Complete SAQ; Complete scan (if required); Submit Attestation of Compliance. Validation lasts one year.",
          },
          {
            question: "What is an SAQ?",
            answer:
              "A Self-Assessment Questionnaire based on how you accept payments and protect card data.",
          },
          {
            question: "Do I need to complete a vulnerability scan?",
            answer:
              "If systems have externally facing IPs, you may need quarterly external scans. Sysnet provides scanning tools as an Approved Scanning Vendor.",
          },
          {
            question: "What happens if I don't complete PCI compliance?",
            answer:
              "Non-compliance fees may apply and certain breach-related protections may be impacted.",
          },
          {
            question: "What is the difference between PCI Basic and PCI Plus?",
            answer:
              "Basic = merchant-led SAQ completion. Plus = \"white glove\" guided assistance and additional tools.",
          },
          {
            question: "How do I enroll in PCI Plus?",
            answer:
              "Enrollment requests are submitted via email to PCIProgramTeam@elavon.com. SLA is ~7 business days.",
          },
          {
            question: "Will I receive reminders?",
            answer:
              "Yes, automated emails are sent (welcome, reminders, grace period, and non-compliance notices).",
          },
        ],
      },
    ],
  },
  {
    categoryKey: "itNetworkConfig",
    items: [
      {
        question: "What firewall ports are required for Oneir cloud access?",
        answer:
          "Port 22 is used, with access verified from the provided IP addresses. (Alternate ports may be configured if required.)",
      },
    ],
  },
  {
    categoryKey: "customizationWorkflows",
    items: [
      {
        question: "Can Oneir handle long Purchase Order numbers from customers?",
        answer:
          "Yes. Long PO numbers can be entered using a special COMMENT product code and printed in the statement comment field.",
      },
    ],
  },
];

export function getCommonQuestionsData(locale: Locale): FAQCategory[] {
  return locale === "fr" ? commonQuestionsDataFr : commonQuestionsData;
}
