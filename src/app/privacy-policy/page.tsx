"use client";

import PageTitle from "@/components/PageTitle";
import config from "@/config";

function PrivacyPolicyPage() {
  const appName = config.appName;
  const email = config.contact.email;
  const company = config.company;

  return (
    <div className="container mx-auto mb-10 max-w-screen-xl">
      <PageTitle pageTitle="Privacy Policy" />
      <p role="page-text-content">
        This privacy policy (&quot;policy&quot;) will help you understand how{" "}
        {company} (&quot;us&quot;, &quot;we&quot;, &quot;our&quot;) uses and
        protects the data you provide to us when you visit and use {appName}{" "}
        (&quot;website&quot;, &quot;service&quot;).
        <br />
        <br />
        We reserve the right to change this policy at any given time, of which
        you will be promptly updated. If you want to make sure that you are up
        to date with the latest changes, we advise you to frequently visit this
        page.
        <br />
        <br />
        <b>What User Data We Collect</b>
        <br />
        <br />
        When you visit the website, we may collect the following data:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Your IP address.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Your contact
        information and email address.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Other information such
        as interests and preferences.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• Data profile regarding
        your online behavior on our website.
        <br />
        <br />
        <b>Why We Collect Your Data</b>
        <br />
        <br />
        We are collecting your data for several reasons:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• To better understand
        your needs.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• To improve our
        services and products.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• To send you
        promotional emails containing the information we think you will find
        interesting.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• To contact you to fill
        out surveys and participate in other types of market research.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• To customize our
        website according to your online behavior and personal preferences.
        <br />
        <br />
        <b>Safeguarding and Securing the Data</b>
        <br />
        <br />
        {company} is committed to securing your data and keeping it
        confidential. {company} has done all in its power to prevent data theft,
        unauthorized access, and disclosure by implementing the latest
        technologies and software, which help us safeguard all the information
        we collect online.
        <br />
        <br />
        <b>Our Cookie Policy</b>
        <br />
        <br />
        Once you agree to allow our website to use cookies, you also agree to
        use the data it collects regarding your online behavior (analyze web
        traffic, web pages you spend the most time on, and websites you visit).
        <br />
        <br />
        The data we collect by using cookies is used to customize our website to
        your needs. After we use the data for statistical analysis, the data is
        completely removed from our systems.
        <br />
        <br />
        Please note that cookies don&#39;t allow us to gain control of your
        computer in any way. They are strictly used to monitor which pages you
        find useful and which you do not so that we can provide a better
        experience for you.
        <br />
        <br />
        If you want to disable cookies, you can do it by accessing the settings
        of your internet browser. (Provide links for cookie settings for major
        internet browsers).
        <br />
        <br />
        <b>Links to Other Websites</b>
        <br />
        <br />
        Our website contains links that lead to other websites. If you click on
        these links {company} is not held responsible for your data and privacy
        protection. Visiting those websites is not governed by this privacy
        policy agreement. Make sure to read the privacy policy documentation of
        the website you go to from our website.
        <br />
        <br />
        <b>Restricting the Collection of your Personal Data</b>
        <br />
        <br />
        At some point, you might wish to restrict the use and collection of your
        personal data. You can achieve this by doing the following:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• When you are filling
        the forms on the website, make sure to check if there is a box which you
        can leave unchecked, if you don&#39;t want to disclose your personal
        information.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• If you have already
        agreed to share your information with us, feel free to contact us via
        email (<a href={`mailto:${email}`}>{email}</a>) and we will be more than
        happy to change this for you.
        <br />
        <br />
        {company} will not lease, sell or distribute your personal information
        to any third parties, unless we have your permission. We might do so if
        the law forces us. Your personal information will be used when we need
        to send you promotional materials if you agree to this privacy policy.
      </p>
    </div>
  );
}

export default PrivacyPolicyPage;
