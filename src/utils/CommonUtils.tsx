import { Bounce, toast } from "react-toastify";
import config from "@/config";

const copyToClipboard = (text: string): boolean => {
  try {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard");
  } catch (err) {
    return false;
  }
  return true;
};

const downloadTxtFile = (content: string, filename: string) => {
  const element = document.createElement("a");
  const file = new Blob([content], {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const showToast = (content: string) => {
  toast.dismiss();
  toast.success(content, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

const generateOpenGraph = (title: string, description: string) => {
  return {
    title: title,
    description: description,
    siteName: config.appName,
    type: "website",
  };
};

export default {
  copyToClipboard,
  downloadTxtFile,
  showToast,
  generateOpenGraph,
};
