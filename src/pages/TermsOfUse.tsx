import React from 'react';
import { IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonHeader} from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';


const TermsOfUse: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar color="primary">
          <IonTitle color="tertiary">Terms & Conditions</IonTitle>
          <IonButtons slot="start">
          <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/menuTab" />
        </IonButtons>
        </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding"  scrollEvents={true}>

<h1>Terms and conditions</h1>
<p>These terms and conditions (&quot;Terms&quot;, &quot;Agreement&quot;) are an agreement between Mobile Application Developer (&quot;Mobile Application Developer&quot;, &quot;us&quot;, &quot;we&quot; or &quot;our&quot;) and you (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;). This Agreement sets forth the general terms and conditions of your use of the Neighburly mobile application and any of its products or services (collectively, &quot;Mobile Application&quot; or &quot;Services&quot;).</p>
<h2>Accounts and membership</h2>
<p>If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and use our Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.</p>
<h2>Links to other mobile applications</h2>
<p>Although this Mobile Application may link to other mobile applications, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked mobile application, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their mobile applications. We do not assume any responsibility or liability for the actions, products, services, and content of any other third-parties. You should carefully review the legal statements and other conditions of use of any mobile application which you access through a link from this Mobile Application. Your linking to any other off-site mobile applications is at your own risk.</p>
<h2>Prohibited uses</h2>
<p>In addition to other terms as set forth in the Agreement, you are prohibited from using the Mobile Application or its Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related mobile application, other mobile applications, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related mobile application, other mobile applications, or the Internet. We reserve the right to terminate your use of the Service or any related mobile application for violating any of the prohibited uses.</p>
<h2>Limitation of liability</h2>
<p>To the fullest extent permitted by applicable law, in no event will Mobile Application Developer, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Mobile Application Developer has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of Mobile Application Developer and its affiliates, officers, employees, agents, suppliers and licensors, relating to the services will be limited to an amount greater of one dollar or any amounts actually paid in cash by you to Mobile Application Developer for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.</p>
<h2>Dispute resolution</h2>
<p>The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Sweden without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of Sweden. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in Sweden, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.</p>
<h2>Changes and amendments</h2>
<p>We reserve the right to modify this Agreement or its policies relating to the Mobile Application or Services at any time, effective upon posting of an updated version of this Agreement in the Mobile Application. When we do, we will revise the updated date at the bottom of this page. Continued use of the Mobile Application after any such changes shall constitute your consent to such changes. Policy was created with <a target="_blank" title="Terms and conditions generator" href="https://www.websitepolicies.com/terms-and-conditions-generator">WebsitePolicies</a>.</p>
<h2>Acceptance of these terms</h2>
<p>You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using the Mobile Application or its Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Mobile Application and its Services.</p>
<h2>Contacting us</h2>
<p>If you would like to contact us to understand more about this Agreement or wish to contact us concerning any matter relating to it, you may send an email to n&#101;&#105;gh&#98;&#117;&#114;ly&#64;&#119;e&#98;&#115;i&#116;&#101;&#46;c&#111;m</p>
<p>This document was last updated on April 24, 2020</p>
        </IonContent>
        </IonPage>
    );
};

export default TermsOfUse