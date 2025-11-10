//*LegalArray.js
export const LegalArray = {
  PP: [
    {
      dates: {effective: 'November 5, 2025', written: 'November 5, 2025'},
      version: {previous: '1.0.0', current: '1.1.0'},
      sections: [
        {
          index: 1,
          title: 'Information We Collect',
          clauses: [
            {
              index: 1,
              info: 'We collect and process information necessary to operate Kitchen Queue and improve your experience.',
              subClause: [
                {
                  index: 1,
                  info: 'Account Data: Name, email, and profile settings you provide when creating or updating your account.',
                },
                {
                  index: 2,
                  info: 'Household Data: Items you add or manage (e.g., Favorites, Shopping Lists, Cupboards, Recipe Box, Community Recipe interactions).',
                },
                {
                  index: 3,
                  info: 'Scan Data: Barcodes (UPCs/EANs) and limited context needed to look up matching products.',
                },
                {
                  index: 4,
                  info: 'Content You Upload: Recipe photos and other media you choose to add.',
                },
                {
                  index: 5,
                  info: 'Device/Usage Data: Device type/OS, app version, basic diagnostics and in-app actions used to maintain performance and prevent abuse.',
                },
              ],
            },
          ],
        },
        {
          index: 2,
          title: 'Sources of Information',
          clauses: [
            {
              index: 1,
              info: 'We obtain information:',
              subClause: [
                {
                  index: 1,
                  info: 'Directly from you when you create an account, add items, scan barcodes, upload photos, or interact with recipes.',
                },
                {
                  index: 2,
                  info: 'Automatically from your device during normal app operation (e.g., performance and error events).',
                },
                {
                  index: 3,
                  info: 'From trusted third parties when you use features that require product lookups (see “Third-Party Services”).',
                },
              ],
            },
          ],
        },
        {
          index: 3,
          title: 'How We Use Your Information',
          clauses: [
            {
              index: 1,
              info: 'We use information to:',
              subClause: [
                {
                  index: 1,
                  info: 'Provide core features: Favorites, UPC (Barcode) Scanning, Community Recipe search/browsing, and your personal Recipe Box.',
                },
                {
                  index: 2,
                  info: 'Maintain security, prevent misuse, and debug or improve performance and reliability.',
                },
                {
                  index: 3,
                  info: 'Personalize in-app content (e.g., remembering your preferences).',
                },
                {
                  index: 4,
                  info: 'Comply with legal obligations and enforce our Terms of Service.',
                },
              ],
            },
          ],
        },
        {
          index: 4,
          title: 'Third-Party Services',
          clauses: [
            {
              index: 1,
              info: 'When you scan a barcode or request related product data, the app may query trusted third-party providers strictly to fulfill that request and to operate core features.',
              subClause: [
                {
                  index: 1,
                  info: 'We share only what is necessary for the specific function (for example, a barcode value).',
                },
                {
                  index: 2,
                  info: 'Responses are processed in line with those providers’ terms and policies; availability and accuracy may vary.',
                },
                {
                  index: 3,
                  info: 'We do not sell or rent your personal data.',
                },
              ],
            },
            {
              index: 2,
              info: 'Subscriptions & Payments',
              subClause: [
                {
                  index: 1,
                  info: 'All subscription purchases and payments made through the iOS App Store or Google Play Store are processed and billed by those platforms, not by Kitchen Queue.',
                },
                {
                  index: 2,
                  info: 'We receive only limited transactional metadata from Apple or Google (for example, an active status token, tier, or renewal date) so your subscription status can be reflected accurately in your Kitchen Queue account.',
                },
                {
                  index: 3,
                  info: 'Billing, renewals, refunds, and cancellations follow the respective store’s terms and policies. Kitchen Queue does not process or store full payment information.',
                },
              ],
            },
          ],
        },

        {
          index: 5,
          title: 'Sharing and Disclosure',
          clauses: [
            {
              index: 1,
              info: 'We share information only as needed to operate the app or when legally required.',
              subClause: [
                {
                  index: 1,
                  info: 'Service Providers: We use reputable vendors to host, store, process, and secure data and to deliver app functionality.',
                },
                {
                  index: 2,
                  info: 'Legal and Safety: We may disclose information to comply with law, protect users, or defend our rights.',
                },
                {
                  index: 3,
                  info: 'Aggregated or De-identified Data: We may share summaries that cannot reasonably identify you.',
                },
              ],
            },
          ],
        },
        {
          index: 6,
          title: 'Data Retention',
          clauses: [
            {
              index: 1,
              info: 'We retain information for as long as necessary to provide the service and for legitimate business or legal purposes.',
              subClause: [
                {
                  index: 1,
                  info: 'You may delete many items you add (e.g., recipe content), which removes them from future use. Some logs or backups may persist for a limited time.',
                },
              ],
            },
          ],
        },
        {
          index: 7,
          title: 'Your Choices and Rights',
          clauses: [
            {
              index: 1,
              info: 'Depending on your region, you may have rights to access, correct, or delete personal information. Within the app you also control most content you add.',
              subClause: [
                {
                  index: 1,
                  info: 'Managing Your Content (Personal): You can edit or delete items you keep privately in your Recipe Box at any time.',
                },
                {
                  index: 2,
                  info: 'Shared Content (Community): If you publish/share a recipe to the Community, you grant us a continuing right to host, display, and distribute that recipe within Kitchen Queue. Deleting your private copy does not automatically remove the shared copy. We may retain and continue to use shared Community content unless there is a legal conflict or the content was misrepresented as yours. (See Terms of Service for details.)',
                },
                {
                  index: 3,
                  info: 'Takedown Requests (IP/Legal): If you believe a shared recipe infringes your rights or was misrepresented, contact support@kitchen-queue.com with details. We will review and remove content where appropriate.',
                },
                {
                  index: 4,
                  info: 'Account: You can request account deletion. We will disable access and schedule associated personal data for deletion, subject to legal/operational requirements (for example, security logs or necessary records). Community content you published may persist unless a valid takedown basis applies.',
                },
                {
                  index: 5,
                  info: 'Disabled/Deactivated Accounts: If your account is disabled or deactivated (e.g., non-payment or by request), we retain associated account information for up to one (1) calendar year. After that period, the account and related personal data may be removed. Upon request, we may extend retention (for example, to preserve content) or complete removal sooner, subject to legal/operational requirements.',
                },
              ],
            },
          ],
        },
        {
          index: 8,
          title: 'Device Permissions (Camera & Photos)',
          clauses: [
            {
              index: 1,
              info: 'The app requests access to your camera and photo library only so you can use features you initiate (for example, scanning barcodes or adding recipe photos). We do not access these features for our own benefit.',
              subClause: [
                {
                  index: 1,
                  info: 'Camera: Used when you choose to scan a barcode or take a photo for a recipe. Access occurs only during that action.',
                },
                {
                  index: 2,
                  info: 'Photo Library/Media: Used when you choose to select, crop, or upload an image for a recipe. We do not scan or collect unrelated photos.',
                },
                {
                  index: 3,
                  info: 'User Control: Permissions are granted/denied via your device settings and can be changed at any time. Some features may not work without these permissions.',
                },
                {
                  index: 4,
                  info: 'Data Handling: Images or scan results are used only to operate the requested feature (for example, attaching a photo to your recipe or looking up a product). We do not sell or rent your personal data.',
                },
              ],
            },
          ],
        },
        {
          index: 9,
          title: 'Children’s Privacy',
          clauses: [
            {
              index: 1,
              info: 'Kitchen Queue is not directed to children under 13. We do not knowingly collect personal information from children under 13.',
            },
          ],
        },
        {
          index: 10,
          title: 'Security',
          clauses: [
            {
              index: 1,
              info: 'We implement technical and organizational measures to protect information. No method of transmission or storage is 100% secure.',
            },
          ],
        },
        {
          index: 11,
          title: 'Location of Processing (U.S.-Based Service)',
          clauses: [
            {
              index: 1,
              info: 'Kitchen Queue is operated from the United States and is intended for use by U.S. residents. We store and process personal data on U.S.-based systems.',
              subClause: [
                {
                  index: 1,
                  info: 'Third-Party Processing: To deliver certain features you request (for example, barcode lookups), trusted service providers may process or transmit limited data outside the United States. We do not represent those providers as U.S.-based.',
                },
                {
                  index: 2,
                  info: 'Safeguards: Where non-U.S. processing occurs, we require appropriate contractual and organizational safeguards. We will update this Policy if our data-location practices materially change.',
                },
                {
                  index: 3,
                  info: 'Non-U.S. Access: The App is intended for U.S. residents. If you access it from another region, you understand your data will be processed in the United States.',
                },
              ],
            },
          ],
        },
        {
          index: 12,
          title: 'Changes to This Policy',
          clauses: [
            {
              index: 1,
              info: 'We may update this Privacy Policy to reflect changes to our practices. We will revise the “Effective” date and, where required, provide additional notice.',
            },
          ],
        },
        {
          index: 13,
          title: 'Contact Us',
          clauses: [
            {
              index: 1,
              info: 'Questions about privacy or this policy? Contact: support@kitchen-queue.com',
            },
          ],
        },
        {
          index: 14,
          title: 'Enforcement & Reporting',
          clauses: [
            {
              index: 1,
              info: 'If you believe content on Kitchen Queue violates the Privacy Policy or your rights, contact support@kitchen-queue.com with details. We review reports and take action when appropriate, including removal of content and cooperating with lawful requests.',
            },
          ],
        },
      ],
    },
  ],
  TOS: [
    {
      dates: {effective: 'November 5, 2025', written: 'November 5, 2025'},
      version: {previous: '1.0.0', current: '1.1.0'},

      sections: [
        {
          index: 1,
          title: 'Acceptance of Terms',
          clauses: [
            {
              index: 1,
              info: 'By creating an account or using Kitchen Queue, you agree to these Terms of Service (“Terms”). If you do not agree, do not use the App.',
            },
            {
              index: 2,
              info: 'We may update these Terms from time to time. Material changes will be reflected by the version and effective date shown above and within the App Help > Terms of Service modal.',
            },
          ],
        },
        {
          index: 2,
          title: 'Who May Use the App',
          clauses: [
            {
              index: 1,
              info: 'You must be at least 13 years old to use the App. If you are under 18, you represent that you have permission from a parent or legal guardian. Kitchen Queue is intended for U.S. residents only.',
            },
          ],
        },
        {
          index: 3,
          title: 'Your Account & Security',
          clauses: [
            {
              index: 1,
              info: 'You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.',
            },
            {
              index: 2,
              info: 'You must provide accurate information and promptly update any changes.',
            },
          ],
        },
        {
          index: 4,
          title: 'Features and Services',
          clauses: [
            {
              index: 1,
              info: 'Core features currently include: Shopping Lists / Carts, Cupboards List, Favorites, UPC (Barcode) Scanning, Recipe Search (Community Recipes), and a Recipe Box (Personal).',
            },
            {
              index: 2,
              info: 'We may add, modify, or remove features at any time for reliability, performance, security, or compliance reasons.',
            },
          ],
        },
        {
          index: 5,
          title: 'Third-Party Services & Data Sources',
          clauses: [
            {
              index: 1,
              info: 'Kitchen Queue integrates with third-party services to provide product and recipe-related data.',
            },
            {
              index: 2,
              info: 'Your use of features powered by these services is also subject to the applicable third-party terms and policies. Data availability, accuracy, and formatting may vary and are ultimately provided by those third parties.',
            },
          ],
        },
        {
          index: 6,
          title: 'User Content & License',
          clauses: [
            {
              index: 1,
              info: 'You retain ownership of recipes and other content you create or upload. You grant Kitchen Queue a non-exclusive license to host, display, store, reproduce, and transmit your content solely as necessary to operate and improve the App and its features, without any payment to you.',
            },
            {
              index: 2,
              info: 'Personal vs. Shared: Deleting a recipe from your personal Recipe Box removes your private copy. If you have published/shared that recipe to the Community, deleting your private copy does not automatically remove the shared Community version.',
            },
            {
              index: 3,
              info: 'Community License: By publishing/sharing a recipe to the Community, you grant Kitchen Queue a continuing license to host, display, and distribute that recipe within the App (including indexing and in-app search), unless there is a legal conflict or the content was misrepresented as yours.',
            },
            {
              index: 4,
              info: 'Misrepresentation & Legal Conflicts: If a recipe is misrepresented (e.g., you lack rights to share it) or there is a valid legal conflict, we may remove or disable the content. Report concerns to support@kitchen-queue.com with details for review.',
            },
            {
              index: 5,
              info: 'Your Responsibilities: You represent and warrant you have the necessary rights to the content you submit and that your content will not infringe or violate any third-party rights or laws.',
            },
          ],
        },
        {
          index: 7,
          title: 'Acceptable Use',
          clauses: [
            {
              index: 1,
              info: 'You agree not to misuse the App. Without limitation, you must not:',
              subClause: [
                {
                  index: 1,
                  info: 'Upload, publish, or submit any content or data for which you do not have all necessary rights, permissions, or licenses.',
                },
                {
                  index: 2,
                  info: 'Upload content that infringes, misappropriates, or violates any third party’s intellectual property, privacy, publicity, or other rights.',
                },
                {
                  index: 3,
                  info: 'Post another person’s personal data without their consent, or submit confidential/proprietary information you are not authorized to share.',
                },
                {
                  index: 4,
                  info: 'Attempt to reverse engineer, interfere with, or disrupt the App or its security.',
                },
                {
                  index: 5,
                  info: 'Bypass or attempt to bypass usage limits or rate limits (e.g., scanning or search caps).',
                },
                {
                  index: 6,
                  info: 'Automate scraping, bulk-harvest data, or otherwise misuse the service or its content.',
                },
                {
                  index: 7,
                  info: 'Use the App for anything other than lawful, food/cooking, and household-related purposes appropriate for consumption planning and guidance.',
                },
                {
                  index: 8,
                  info: 'Post, promote, or provide instructions to create illegal drugs, explosives, weapons, or other materials intended to cause harm or property damage.',
                },
                {
                  index: 9,
                  info: 'Solicit, facilitate, or transact in illegal or regulated goods/services (including narcotics, weapons, or explosive components).',
                },
                {
                  index: 10,
                  info: 'Encourage or depict dangerous activities that are likely to result in injury or harm.',
                },
                {
                  index: 11,
                  info: 'Upload malware or engage in spam, phishing, or attempts to gain unauthorized access to accounts, data, or systems.',
                },
              ],
            },
          ],
        },
        {
          index: 8,
          title: 'Accuracy, Nutrition & Safety Disclaimers',
          clauses: [
            {
              index: 1,
              info: 'Product, nutrition, and ingredient information may be incomplete, out-of-date, or vary by region and manufacturer. Always verify labels and consult qualified professionals for dietary or medical decisions.',
            },
            {
              index: 2,
              info: 'Kitchen Queue is not a substitute for professional medical, nutritional, or dietary advice.',
            },
          ],
        },
        {
          index: 9,
          title: 'Intellectual Property',
          clauses: [
            {
              index: 1,
              info: 'The App, including its logo, UI, and code, is owned by Kitchen Queue and its licensors and is protected by applicable IP laws. Except for the limited license needed to use the App, no rights are granted.',
            },
          ],
        },
        {
          index: 10,
          title: 'Subscriptions & Limits',
          clauses: [
            {
              index: 1,
              info: 'Certain features may be subject to daily limits or subscription tiers. Limits and tiers may change to maintain service quality and third-party compliance.',
            },
            {
              index: 2,
              info: 'Subscriptions and payments made through the iOS App Store or Google Play Store are managed by those platforms. Billing, renewals, and cancellations follow the respective store’s policies and settings.',
            },
          ],
        },
        {
          index: 11,
          title: 'Termination',
          clauses: [
            {
              index: 1,
              info: 'We may suspend or terminate access to the App (with or without notice) if we believe you have violated these Terms or to address security, legal, or operational issues.',
            },
            {
              index: 2,
              info: 'You may stop using the App at any time. If your account is disabled or deactivated (e.g., non-payment or by request), associated account information may be retained for up to one (1) calendar year, after which it may be removed, subject to legal/operational requirements.',
            },
            {
              index: 3,
              info: 'Community Content Persistence: Deleting your account or your private copy of a recipe does not automatically remove versions you previously shared to the Community. We may retain and continue to host Community content unless there is a legal conflict or the content was misrepresented as yours.',
            },
          ],
        },

        {
          index: 12,
          title: 'Disclaimer of Warranties',
          clauses: [
            {
              index: 1,
              info: 'THE APP AND ALL CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
            },
          ],
        },
        {
          index: 13,
          title: 'Limitation of Liability',
          clauses: [
            {
              index: 1,
              info: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, KITCHEN QUEUE AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, ARISING FROM YOUR USE OF THE APP.',
            },
          ],
        },
        {
          index: 14,
          title: 'Indemnification',
          clauses: [
            {
              index: 1,
              info: 'You agree to indemnify and hold Kitchen Queue harmless from any claims, liabilities, damages, and expenses (including reasonable attorneys’ fees) arising out of your content or your breach of these Terms.',
            },
          ],
        },
        {
          index: 15,
          title: 'Governing Law & Disputes',
          clauses: [
            {
              index: 1,
              info: 'These Terms are governed by the laws of the State of North Dakota, USA, without regard to conflict-of-laws rules. You agree to the exclusive jurisdiction of courts located in North Dakota for any dispute not subject to arbitration.',
            },
          ],
        },
        {
          index: 16,
          title: 'Contact',
          clauses: [
            {
              index: 1,
              info: 'Questions? Contact: support@kitchen-queue.com (or see the Help screen for in-app contact options).',
            },
          ],
        },
        {
          index: 17,
          title: 'Reporting, Enforcement & DMCA',
          clauses: [
            {
              index: 1,
              info: 'If you see content that violates these Terms (including illegal content, copyright infringement, or content that presents an imminent safety risk) please report it to us at support@kitchen-queue.com with full details so we can investigate.',
            },
            {
              index: 2,
              info: 'We may remove or disable access to content that violates these Terms or appears unlawful, and we may suspend or terminate accounts responsible for violations. We may also retain records as required for legal or security purposes.',
            },
            {
              index: 3,
              info: 'DMCA Takedown Requests (Copyright): If you believe content on the Service infringes your copyright, send a notice that includes: (a) a physical or electronic signature of the copyright owner or agent; (b) identification of the copyrighted work claimed to be infringed; (c) identification of the material claimed to infringe and where it is located on the Service; (d) contact information for the complaining party; (e) a statement under penalty of perjury that the information in the notice is accurate and that you are the copyright owner or authorized to act on their behalf. Send DMCA notices to: support@kitchen-queue.com.',
            },
            {
              index: 4,
              info: 'Counter-Notices: If you believe content was removed in error, you may send a counter-notice to support@kitchen-queue.com including the required elements under 17 U.S.C. §512(g). We will follow applicable law in responding to valid counter-notices.',
            },
            {
              index: 5,
              info: 'Emergency or Dangerous Content: If content presents an immediate risk of physical harm or illegal activity (for example instructions to make explosives, or imminent violence), please contact local law enforcement immediately and then notify us at support@kitchen-queue.com. We will cooperate with law enforcement as required.',
            },
          ],
        },
      ],
    },
  ],

  About: [
    {
      sections: [
        {
          index: 1,
          title: 'What is Kitchen Queue',
          clauses: [
            {
              index: 1,
              info: 'Kitchen Queue is a U.S.-based app that helps you manage shopping lists, cupboards, personal recipes (Recipe Box), and explore shared community recipes.',
            },
          ],
        },
        {
          index: 2,
          title: 'Core Features',
          clauses: [
            {
              index: 1,
              info: 'Shopping Lists / Carts, Cupboards, Favorites, UPC (barcode) scanning, Community Recipe search, and your personal Recipe Box are built-in features of the app.',
            },
          ],
        },
        {
          index: 3,
          title: 'Data Sources (High Level)',
          clauses: [
            {
              index: 1,
              info: 'To power barcode/product lookups and related content, the app may query trusted third-party services strictly to fulfill your requests. We share only what is necessary (for example, a barcode value) and handle responses under those providers’ terms. See the Privacy Policy and Terms of Service for details.',
            },
          ],
        },
        {
          index: 4,
          title: 'Where We Operate',
          clauses: [
            {
              index: 1,
              info: 'Kitchen Queue is operated in the United States and intended for U.S. residents. If you access the app from another region, your data will be processed in the U.S.',
            },
          ],
        },
        {
          index: 5,
          title: 'Contact',
          clauses: [
            {
              index: 1,
              info: 'Questions or concerns? Email support@kitchen-queue.com.',
            },
          ],
        },
      ],
    },
  ],
};
