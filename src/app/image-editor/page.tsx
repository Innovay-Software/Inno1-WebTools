import PageTitle from "@/components/PageTitle";

function ImageEditorPage() {
  return (
    <div>
      <iframe
        className="w-full"
        style={{ minHeight: "calc(100vh - 52px)" }}
        id="miniPaint"
        src="https://viliusle.github.io/miniPaint/"
        allow="camera"
      ></iframe>
      <div className="container my-10 mx-auto max-w-screen-xl">
        <PageTitle pageTitle="Image Editor" />
        <p className="mt-10 text-lg" role="page-text-content">
          Credit: this image editor is an open source project under the MIT
          license: &nbsp;
          <a href="https://github.com/viliusle/miniPaint" target="_blank">
            https://github.com/viliusle/miniPaint
          </a>
          <br />
          <br />
          <br />
          <b>Benefits of Using Image Editors in Browser:</b>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;• <b>Convenience and Accessibility:</b> You
          can edit images from any device with a web browser and internet
          connection, without installing software.
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;• <b>Simple Edits:</b> They are well-suited
          for quick and basic image edits without needing a powerful program.
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;• <b>Collaboration:</b> Some browser-based
          editors allow real-time collaboration, enabling multiple users to edit
          an image simultaneously.
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;• <b>Free or Freemium Options:</b> Many
          browser-based editors are free to use, with some offering premium
          features for a subscription.
        </p>
      </div>
    </div>
  );
}

export default ImageEditorPage;
