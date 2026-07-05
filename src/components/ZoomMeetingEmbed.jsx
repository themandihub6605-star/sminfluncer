import React, { useEffect, useRef } from "react";

// Uses Zoom's full "Client View" Web Meeting SDK (not the lightweight
// Embedded Component View). This renders the COMPLETE native Zoom UI -
// chat, participants, reactions, recording, everything - exactly like
// zoom.us, but the browser's URL bar stays on OUR domain the whole time.
const ZoomMeetingEmbed = ({ meetingConfig, userName }) => {
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const startMeeting = async () => {
      const { ZoomMtg } = await import("@zoom/meetingsdk");

      await import("@zoom/meetingsdk/dist/css/bootstrap.css");
      await import("@zoom/meetingsdk/dist/css/react-select.css");

      ZoomMtg.setZoomJSLib("https://source.zoom.us/3.9.0/lib", "/av");
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
      ZoomMtg.i18n.load("en-US");
      ZoomMtg.i18n.reload("en-US");

      const zmmtgRoot = document.getElementById("zmmtg-root");
      if (zmmtgRoot) zmmtgRoot.style.display = "block";

      ZoomMtg.init({
     leaveUrl: `${window.location.origin}/thank-you`,
        disableZoomLogo: true, // hides the "Zoom Workplace" logo/header
        patchJsMedia: true,
        success: () => {
          ZoomMtg.join({
            sdkKey: meetingConfig.sdkKey,
            signature: meetingConfig.signature,
            meetingNumber: meetingConfig.meetingNumber,
            passWord: meetingConfig.password,
            userName: userName || "Host",
            success: () => console.log("Joined as host successfully"),
            error: (err) => console.error("Zoom join error:", err),
          });
        },
        error: (err) => console.error("Zoom init error:", err),
      });
    };

    startMeeting();
  }, [meetingConfig, userName]);

  return null;
};

export default ZoomMeetingEmbed;