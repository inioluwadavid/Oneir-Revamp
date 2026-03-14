/**
 * FAQ content for Common Questions page - French
 */
import type { FAQCategory } from "./common-questions";

export const commonQuestionsDataFr: FAQCategory[] = [
  {
    categoryKey: "cloudHosting",
    items: [
      {
        question: "Comment les utilisateurs se connectent-ils à Oneir dans le cloud?",
        answer:
          "Les utilisateurs se connectent de manière sécurisée via une connexion terminal au serveur cloud Oneir. Votre équipe recevra les détails de connexion requis et les paramètres recommandés pour assurer une expérience stable.",
      },
      {
        question: "Oneir peut-il fonctionner dans une machine virtuelle (VM)?",
        answer:
          "Oui. Oneir prend en charge les environnements virtuels courants, y compris les options VMware utilisées par de nombreux clients.",
      },
      {
        question: "Comment entrer ma clé de licence Telnet98?",
        answer:
          "Dans Telnet98, allez à Options → Licence et entrez votre clé. Le copier-coller est recommandé pour éviter les erreurs de saisie.",
      },
    ],
  },
  {
    categoryKey: "serverVmware",
    items: [
      {
        question: "Quelle configuration serveur Oneir requiert-il au siège social?",
        answer:
          "Le siège social nécessite un serveur Oneir fonctionnant sous Linux. De nombreux clients installent Oneir dans une machine virtuelle VMware sur un serveur sous-utilisé existant.",
      },
      {
        question: "Oneir peut-il fonctionner dans VMware?",
        answer:
          "Oui. Oneir peut fonctionner dans VMware Server sur un hôte Windows Server ou Linux. La machine virtuelle Oneir est isolée des autres VM et de l'hôte, améliorant la stabilité.",
      },
      {
        question: "Combien de machines virtuelles sont recommandées?",
        answer:
          "Oneir recommande pas plus de deux installations sur l'hôte: Oneir Linux et une VM Microsoft Windows (si nécessaire).",
      },
      {
        question: "Quelles sont les exigences matérielles minimales?",
        answer:
          "Mémoire: 512 Mo minimum; 4 Go recommandés. Disque dur: ~20 Go pour la VM Oneir. (Des ressources supplémentaires peuvent être requises selon les autres VM.)",
      },
      {
        question: "Quels systèmes d'exploitation sont pris en charge pour l'hôte VMware?",
        answer:
          "Pris en charge: Windows Server 2003 (éditions serveur uniquement) et hôtes Linux. Les versions bureau ne sont pas recommandées.",
      },
      {
        question: "CentOS peut-il être utilisé comme système d'exploitation hôte?",
        answer:
          "Oui. CentOS est compatible avec Red Hat Enterprise Linux et a été utilisé avec succès par les clients Oneir.",
      },
      {
        question: "Une adresse IP statique est-elle requise?",
        answer:
          "Une IP externe statique est recommandée. Une IP dynamique peut être utilisée avec DNS dynamique pour les configurations à un seul emplacement si correctement protégée derrière un routeur/pare-feu.",
      },
      {
        question: "Pourquoi un test d'utilisation de base est-il requis?",
        answer:
          "Il confirme que le serveur hôte dispose de suffisamment de ressources disponibles et n'est pas fortement sollicité pendant les heures de bureau avant l'installation de VMware.",
      },
      {
        question: "Comment VMware protège-t-il le serveur Oneir?",
        answer:
          "VMware isole la VM Oneir du système d'exploitation hôte et des autres machines virtuelles. Si une VM plante, les autres restent intactes. Les fichiers VM sont également plus faciles à sauvegarder et migrer.",
      },
    ],
  },
  {
    categoryKey: "printingForms",
    items: [
      {
        question: "Quelles imprimantes sont requises pour imprimer des formulaires avec logos?",
        answer:
          "Pour imprimer des formulaires avec logos, votre imprimante doit prendre en charge PostScript. Pour les rapports simples, les imprimantes doivent prendre en charge PCL6. L'impression de reçus POS nécessite une imprimante de reçus compatible ESC/POS.",
      },
      {
        question: "Pourquoi les travaux d'impression restent-ils parfois bloqués?",
        answer:
          "De nombreuses imprimantes passent en mode veille/économie d'énergie et peuvent ne pas se réveiller de manière fiable lors de l'envoi d'un travail. Ajustez les paramètres de veille ou réveillez l'imprimante avant d'imprimer.",
      },
      {
        question: "Qu'est-ce que WatchFolder?",
        answer:
          'WatchFolder ouvre automatiquement les rapports/formulaires Oneir dans votre visionneuse PDF lorsque vous imprimez vers "Afficher le PDF à l\'écran".',
      },
      {
        question: "Comment partager une imprimante pour Oneir?",
        answer:
          "Les imprimantes doivent être correctement partagées sur le réseau et accessibles depuis le poste de travail exécutant Oneir. Assurez-vous que le nom de l'imprimante partagée correspond à la configuration dans la configuration d'impression.",
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
            question: "Oneir prend-il en charge les virements électroniques (EFT) aux fournisseurs?",
            answer:
              "Oui. Oneir prend en charge les paiements EFT aux fournisseurs, réduisant le besoin de chèques imprimés.",
          },
          {
            question: "Quels sont les avantages de l'EFT par rapport aux chèques?",
            answer:
              "L'EFT réduit les chèques perdus, les coûts d'impression/expédition, les erreurs de saisie et améliore la satisfaction des fournisseurs. Cela peut également simplifier la réconciliation.",
          },
          {
            question: "Quelles banques sont prises en charge pour l'EFT?",
            answer:
              "TD, RBC, Banque Scotia, BMO, CIBC, Banque Nationale. La Banque Royale prend également en charge le format fonds américains.",
          },
          {
            question: "Quelles informations sont requises pour configurer l'EFT?",
            answer:
              "Un chèque annulé (numéros de banque/transit/compte) et votre numéro client / ID de l'initiateur fourni par votre banque.",
          },
          {
            question: "Oneir peut-il générer des avis de remittance EFT?",
            answer:
              "Oui. Les avis de remittance peuvent inclure les références de facture, les montants payés et les détails de confirmation de paiement.",
          },
        ],
      },
      {
        subcategoryKey: "multiCurrencyPurchasing",
        items: [
          {
            question: "Oneir prend-il en charge plusieurs devises?",
            answer:
              "Oui. Oneir prend en charge jusqu'à 18 devises étrangères pour les achats et comptes fournisseurs, avec conversion au taux de change en devise nationale.",
          },
          {
            question: "Comment activer des devises supplémentaires?",
            answer:
              "Connectez-vous avec un mot de passe niveau 9 → Initialisation → Mettre à jour les taux de change → entrez le code devise et le taux → enregistrez. Puis utilisez le code devise sur le fournisseur ou le bon de commande.",
          },
        ],
      },
    ],
  },
  {
    categoryKey: "purchaseOrdersReceiving",
    items: [
      {
        question: "Oneir peut-il générer automatiquement des bons de commande?",
        answer:
          "Oui. Oneir peut générer des BC automatiquement selon les niveaux de stock et quantités minimales.",
      },
      {
        question: "Qu'est-ce que la fonction Guide des bons de commande?",
        answer:
          "Le guide BC suggère des bons de commande selon l'activité de vente passée sur une période définie. Vous gardez le contrôle total des quantités.",
      },
      {
        question: "Oneir prend-il en charge la réception de conteneurs et les calculs de coût d'acquisition?",
        answer:
          "Oui. La réception de conteneurs prend en charge plusieurs BC par conteneur, plusieurs devises, et distribue les coûts de fret/douane/manutention (coût d'acquisition) par pourcentage de poids.",
      },
      {
        question: "Les bons de commande peuvent-ils être créés en devises étrangères?",
        answer:
          "Oui. Les BC doivent être créés dans la devise de facturation du fournisseur pour que la conversion et les coûts d'acquisition fonctionnent correctement.",
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
            question: "Oneir prend-il en charge les nomenclatures (BOM)?",
            answer:
              "Oui. Oneir prend en charge un système BOM complet incluant la production multi-phases, le coût standard, le coût FIFO, les sous-ensembles et les coûts main/mise en route.",
          },
          {
            question: "Oneir peut-il prendre en charge l'assemblage de produits ou les promotions?",
            answer:
              "Oui. Oneir prend en charge les prix Mix & Match, les promotions Tag Along et le Kitting.",
          },
        ],
      },
      {
        subcategoryKey: "interdivisionalStockTransfer",
        items: [
          {
            question: "Qu'est-ce que le transfert interdivisions?",
            answer:
              "Il permet à une division de demander du stock à une autre, suit l'inventaire \"En transit\" et transfère la valeur de l'inventaire via le grand livre.",
          },
          {
            question: "Les transferts peuvent-ils dépasser la quantité en main?",
            answer:
              "Oui. Le module de transfert plus récent prend en charge les transferts dépassant les quantités actuelles en main (position d'inventaire négative), contrairement à l'ancienne méthode.",
          },
          {
            question: "Comment les transferts sont-ils suivis dans le grand livre?",
            answer:
              "La valeur de l'inventaire transite par un compte de transfert d'inventaire puis est transférée dans l'inventaire de réception à la réception.",
          },
        ],
      },
      {
        subcategoryKey: "yearEndStockCount",
        items: [
          {
            question: "Comment importer les quantités de dénombrement de fin d'année d'un scanner portable?",
            answer:
              "Menu Gestion des stocks → Menu Dénombrement → Téléverser les quantités du collecteur portable → sélectionnez pn_qtyho.tab → appliquez les quantités à la division correcte.",
          },
          {
            question: "Que faire si pn_qtyho.tab n'apparaît pas?",
            answer:
              "Confirmez que le fichier a été téléchargé avec succès et qu'il se trouve dans le dossier de données de l'entreprise correct. Sinon, contactez le support.",
          },
          {
            question: "Quand dois-je utiliser cette fonction?",
            answer:
              "Dénombrements de fin d'année, dénombrements physiques complets et audits d'entrepôt périodiques.",
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
            question: "Oneir peut-il envoyer des relevés avec copies de factures par courriel?",
            answer:
              "Oui. Les relevés Balance Forward peuvent inclure des copies PDF des factures et notes de crédit dans une pièce jointe unique par client.",
          },
          {
            question: "Comment activer les relevés avec copies de factures?",
            answer:
              "Cela est contrôlé par le paramètre de relevé du client (certaines options activent les copies de factures).",
          },
          {
            question: "Pourquoi les copies de factures ne se sont-elles pas jointes à mon courriel de relevé?",
            answer:
              "Raisons courantes: le type de relevé n'est pas Balance Forward; le client n'est pas configuré pour les copies de factures; aucune facture/note de crédit dans la période du relevé.",
          },
        ],
      },
      {
        subcategoryKey: "exportingCustomerEmails",
        items: [
          {
            question: "Comment exporter les adresses courriel des clients depuis Oneir?",
            answer:
              "Comptes débiteurs → Menu Rapports CD → Imprimer liste maître clients → \"Imprimer adresses courriel?\" = O → \"Exporter les adresses courriel vers un fichier?\" = O → choisissez un dossier → ouvrez dans Excel.",
          },
        ],
      },
    ],
  },
  {
    categoryKey: "refundsCreditsWriteoffs",
    items: [
      {
        question: "Comment radier le solde impayé d'un client?",
        answer:
          "Publiez un ajustement crédit/débit manuel contre la facture/note de crédit à radier et publiez la radiation sur le compte GL approprié (souvent créances irrecouvrables).",
      },
      {
        question: "Comment rembourser un client par chèque?",
        answer:
          "Étape 1: Compensez le crédit CD à l'aide d'un débit manuel et d'un compte GL de compensation. Étape 2: Émettez un chèque dans AP en utilisant le code fournisseur \"CASH\" en publiant sur le même compte de compensation et la bonne banque.",
      },
      {
        question: "Comment rembourser un client par carte de crédit?",
        answer:
          "Assurez-vous qu'un crédit existe → publiez un débit manuel dans CD référençant la note de crédit → publiez le remboursement sur le compte GL utilisé pour les dépôts par carte de crédit.",
      },
    ],
  },
  {
    categoryKey: "financeChargesInterest",
    items: [
      {
        question: "Oneir peut-il publier des frais financiers aux comptes débiteurs?",
        answer:
          "Oui. Oneir peut calculer et publier les frais financiers au CD et au grand livre. Les factures de frais financiers sont créées au format AAMMFC.",
      },
      {
        question: "Comment les frais financiers sont-ils calculés?",
        answer:
          "Nécessite l'option de relevé client \"Imprimer relevé avec frais financiers\". Oneir calcule les jours de retard selon la date de facture, la date de relevé et les conditions, applique un facteur d'intérêt et calcule selon le taux mensuel.",
      },
      {
        question: "Puis-je prévisualiser les frais financiers avant publication?",
        answer:
          "Oui. Imprimez le rapport des frais financiers pour les examiner. (Note: vous devez quitter le programme après avoir sélectionné l'option de rapport pour qu'il s'imprime.)",
      },
      {
        question: "Les frais financiers peuvent-ils être annulés?",
        answer:
          "Oui. Comptes débiteurs → Annuler frais financiers → entrez le numéro de facture des frais financiers. Les annulations sont publiées automatiquement au CD et au grand livre.",
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
            question: "Que signifie « La date est en dehors des trois exercices fiscaux »?",
            answer:
              "Cela indique qu'une clôture de fin d'année est requise dans le grand livre avant de poursuivre dans l'exercice fiscal en cours.",
          },
          {
            question: "Que dois-je faire avant d'exécuter la clôture de fin d'année?",
            answer:
              "Assurez-vous que tous les utilisateurs sont déconnectés; effectuez une sauvegarde complète; imprimez les rapports requis pour l'année retirée; exécutez la clôture de fin d'année; vérifiez les exercices fiscaux ensuite.",
          },
        ],
      },
      {
        subcategoryKey: "balancingArToGl",
        items: [
          {
            question: "Comment équilibrer les comptes débiteurs au grand livre?",
            answer:
              "Confirmez si les dépôts et les créances sont publiés sur le même compte GL et si le client POS \"CASH\" est utilisé. Puis équilibrez en utilisant l'une des deux méthodes (combinée ou créances/dépôts séparés). Important: les dépôts \"CASH\" POS en attente n'apparaissent pas sur les rapports CD standards et ne peuvent pas être antidatés; imprimez les rapports POS requis à la date d'équilibrage.",
          },
        ],
      },
    ],
  },
  {
    categoryKey: "pointOfSale",
    items: [
      {
        question: "Oneir prend-il en charge les chèques-cadeaux?",
        answer:
          "Oui. Les chèques-cadeaux peuvent être vendus et encaissés avec une publication GL et CD appropriée. Les chèques-cadeaux doivent être vendus à un dossier client (pas une vente au comptant).",
      },
      {
        question: "Comment les chèques-cadeaux sont-ils encaissés?",
        answer:
          "Traitez une vente client → sélectionnez le mode de paiement Chèque-cadeau → complétez la transaction. Les certificats doivent être vendus avant de pouvoir être encaissés.",
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
            question: "Comment fonctionnent les niveaux de sécurité des mots de passe dans Oneir?",
            answer:
              "Oneir utilise une hiérarchie de sécurité à 9 niveaux. Chaque niveau inclut les permissions des niveaux inférieurs, et les niveaux supérieurs débloquent les prix, marges, utilitaires financiers et fonctions d'initialisation.",
          },
          {
            question: "Qui devrait avoir l'accès niveau 9?",
            answer:
              "Le niveau 9 devrait être restreint à la direction seulement car il inclut l'initialisation du système et tous les utilitaires dans les modules.",
          },
        ],
      },
      {
        subcategoryKey: "pciCompliance",
        items: [
          {
            question: "Qu'est-ce que la conformité PCI?",
            answer:
              "PCI DSS est la norme de sécurité de l'industrie des cartes de paiement pour protéger les données des titulaires de cartes. Les marchands doivent valider la conformité annuellement.",
          },
          {
            question: "Qu'est-ce que PCI Compliance Manager?",
            answer:
              "Un portail en ligne géré par Sysnet Global Solutions qui aide les marchands à remplir les SAQ, exécuter les analyses (si requis), soumettre les documents et suivre le statut de conformité.",
          },
          {
            question: "Quand la conformité PCI doit-elle être complétée?",
            answer:
              "Dans les 90 jours suivant l'activation, et annuellement par la suite. La non-conformité peut entraîner des frais mensuels de 59,99 $ jusqu'à validation.",
          },
          {
            question: "Quelles sont les étapes pour valider la conformité PCI?",
            answer:
              "Personnaliser le compte; compléter le profil d'entreprise; compléter le SAQ; effectuer l'analyse (si requis); soumettre l'attestation de conformité. La validation dure un an.",
          },
          {
            question: "Qu'est-ce qu'un SAQ?",
            answer:
              "Un questionnaire d'auto-évaluation basé sur la façon dont vous acceptez les paiements et protégez les données des cartes.",
          },
          {
            question: "Dois-je effectuer une analyse de vulnérabilité?",
            answer:
              "Si les systèmes ont des IP exposées à l'externe, vous pourriez avoir besoin d'analyses externes trimestrielles. Sysnet fournit des outils d'analyse en tant que fournisseur d'analyse approuvé.",
          },
          {
            question: "Que se passe-t-il si je ne complète pas la conformité PCI?",
            answer:
              "Des frais de non-conformité peuvent s'appliquer et certaines protections liées aux violations peuvent être affectées.",
          },
          {
            question: "Quelle est la différence entre PCI Basic et PCI Plus?",
            answer:
              "Basic = remplissage du SAQ par le marchand. Plus = assistance guidée « gants blancs » et outils supplémentaires.",
          },
          {
            question: "Comment m'inscrire à PCI Plus?",
            answer:
              "Les demandes d'inscription sont soumises par courriel à PCIProgramTeam@elavon.com. Le SLA est d'environ 7 jours ouvrables.",
          },
          {
            question: "Recevrai-je des rappels?",
            answer:
              "Oui, des courriels automatiques sont envoyés (bienvenue, rappels, période de grâce et avis de non-conformité).",
          },
        ],
      },
    ],
  },
  {
    categoryKey: "itNetworkConfig",
    items: [
      {
        question: "Quels ports de pare-feu sont requis pour l'accès cloud Oneir?",
        answer:
          "Le port 22 est utilisé, avec accès vérifié depuis les adresses IP fournies. (Des ports alternatifs peuvent être configurés si requis.)",
      },
    ],
  },
  {
    categoryKey: "customizationWorkflows",
    items: [
      {
        question: "Oneir peut-il gérer les longs numéros de bons de commande des clients?",
        answer:
          "Oui. Les longs numéros de BC peuvent être saisis en utilisant un code produit COMMENT spécial et imprimés dans le champ commentaire du relevé.",
      },
    ],
  },
];
