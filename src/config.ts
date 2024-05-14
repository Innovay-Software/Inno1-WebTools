type GlobalConfig = {
  company: string;
  companyUrl: string;
  appName: string;
  siteDomain: string;
  version: string;
  contact: {
    email: string;
    phone: string;
  };
  menus: {
    activator: string;
    open?: boolean;
    hidden: boolean;
    icon: string;
    homeImage: string;
    color: string;
    subMenus: {
      title: string;
      routeName: string;
      routePath: string;
      icon: string;
    }[];
  }[];
};

const config1: GlobalConfig = {
  company: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "",
  companyUrl: process.env.NEXT_PUBLIC_COMPANY_URL ?? "",
  siteDomain: process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "",
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "",
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? "",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  },
  menus: [
    {
      activator: "GENERATORS",
      open: false,
      hidden: false,
      icon: "mdi-blank",
      homeImage: "/home-generator.png",
      color: "#191970",
      subMenus: [
        // {title: 'HTML Color Code', routeName: 'ColorConverter', icon: 'mdi-format-color-fill'},
        {
          title: "Password Generator",
          routeName: "Password",
          routePath: "/password/",
          icon: "mdi-onepassword",
        },
        {
          title: "QR Code Generator",
          routeName: "QrCode",
          routePath: "/qrcode/",
          icon: "mdi-qrcode",
        },
      ],
    },
    {
      activator: "FORMATTERS",
      open: false,
      hidden: false,
      icon: "mdi-blank",
      homeImage: "/home-formatter.png",
      color: "#0000cd",
      subMenus: [
        {
          title: "JSON Formatter",
          routeName: "Json",
          routePath: "/json-formatter/",
          icon: "mdi-code-json",
        },
        {
          title: "XML Formatter",
          routeName: "Xml",
          routePath: "/xml-formatter/",
          icon: "mdi-xml",
        },
        {
          title: "HTML Formatter",
          routeName: "Html",
          routePath: "/html-formatter/",
          icon: "mdi-language-html5",
        },
        {
          title: "Javascript Formatter",
          routeName: "Javascript",
          routePath: "/javascript-formatter/",
          icon: "mdi-language-javascript",
        },
        {
          title: "CSS Formatter",
          routeName: "Css",
          routePath: "/css-formatter/",
          icon: "mdi-language-css3",
        },
      ],
    },
    {
      activator: "VISUAL TOOLS",
      open: false,
      hidden: false,
      icon: "mdi-blank",
      homeImage: "/home-visual.png",
      subMenus: [
        {
          title: "HTML Color Code",
          routeName: "ColorConverter",
          routePath: "/color/",
          icon: "mdi-format-color-fill",
        },
        {
          title: "Image Color Extractor",
          routeName: "ImageColorExtractor",
          routePath: "/image-color-extractor/",
          icon: "mdi-image",
        },
        {
          title: "Image to Base64",
          routeName: "ImageBase64",
          routePath: "/image-base64/",
          icon: "mdi-image-multiple",
        },
        {
          title: "Image Compression",
          routeName: "ImageCompression",
          routePath: "/image-compression/",
          icon: "mdi-image-multiple",
        },
        {
          title: "Image Editor",
          routeName: "ImageEditor",
          routePath: "/image-editor/",
          icon: "mdi-image-filter-vintage",
        },
      ],
      color: "#4169e1",
    },
    {
      activator: "ENCODERS",
      open: false,
      hidden: false,
      icon: "mdi-blank",
      homeImage: "/home-encoder.png",
      subMenus: [
        {
          title: "JSON Web Token",
          routeName: "Jwt",
          routePath: "/jwt/",
          icon: "mdi-blur",
        },
        {
          title: "MD5 Hash",
          routeName: "Md5",
          routePath: "/md5-hash/",
          icon: "mdi-blur",
        },
        {
          title: "SHA1 Hash",
          routeName: "Sha1",
          routePath: "/sha1-hash/",
          icon: "mdi-blur",
        },
        {
          title: "SHA256 Hash",
          routeName: "Sha256",
          routePath: "/sha256-hash/",
          icon: "mdi-blur",
        },
        {
          title: "SHA512 Hash",
          routeName: "Sha512",
          routePath: "/sha512-hash/",
          icon: "mdi-blur",
        },
        {
          title: "URL Encode",
          routeName: "UrlEncode",
          routePath: "/url-encode/",
          icon: "mdi-blur",
        },
        {
          title: "Base64 Encode",
          routeName: "Base64Encode",
          routePath: "/base64-encode/",
          icon: "mdi-blur",
        },
        {
          title: "HTML Escape",
          routeName: "HtmlEscape",
          routePath: "/html-escape/",
          icon: "mdi-blur",
        },
        {
          title: "RSA Encrypt",
          routeName: "RsaEncryption",
          routePath: "/rsa-encryption/",
          icon: "mdi-blur",
        },
      ],
      color: "#8a2be2",
    },
    {
      activator: "CONVERTERS",
      open: false,
      hidden: false,
      icon: "mdi-blank",
      homeImage: "/home-converter.png",
      subMenus: [
        {
          title: "Timestamp",
          routeName: "Timestamp",
          routePath: "/timestamp/",
          icon: "mdi-timer",
        },
      ],
      color: "#6a5acd",
    },
  ],
};

export default config1 satisfies GlobalConfig as GlobalConfig;
