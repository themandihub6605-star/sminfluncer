import React, { useEffect, useRef } from "react";

// Uses @zoom/meetingsdk (Embedded Client) so the meeting UI renders
// fully inside our own page - no redirect to zoom.us, no Zoom branding.
// IMPORTANT: Zoom's own CSS must be imported, or the UI renders unstyled
// instead of looking like the real Zoom client.
const ZoomMeetingEmbed = ({ meetingConfig, userName, onLeave }) => {
  const containerRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const startMeeting = async () => {
      const { default: ZoomMtgEmbedded } = await import("@zoom/meetingsdk/embedded");

      // Zoom's own stylesheets - required for the native Zoom look
      // (control bar, video tiles, buttons). Without these the SDK
      // renders as plain unstyled HTML.
      await import("@zoom/meetingsdk/dist/css/bootstrap.css");
      await import("@zoom/meetingsdk/dist/css/react-select.css");

      const client = ZoomMtgEmbedded.createClient();
      clientRef.current = client;

      if (!isMounted || !containerRef.current) return;

      await client.init({
        zoomAppRoot: containerRef.current,
        language: "en-US",
        patchJsMedia: true,
        customize: {
          video: {
            isResizable: true,
            viewSizes: {
              default: { width: containerRef.current.offsetWidth, height: 600 },
            },
          },
          meetingInfo: ["topic", "participant"],
        },
      });

      await client.join({
        sdkKey: meetingConfig.sdkKey,
        signature: meetingConfig.signature,
        meetingNumber: meetingConfig.meetingNumber,
        password: meetingConfig.password,
        userName: userName || "Guest",
      });
    };

    startMeeting().catch((err) => {
      console.error("Zoom meeting failed to start:", err);
    });

    return () => {
      isMounted = false;
      if (clientRef.current) {
        clientRef.current.leaveMeeting().catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingConfig]);

  return (
    <div className="w-full rounded-2xl overflow-visible bg-black" style={{ minHeight: 600 }}>
      <div
        ref={containerRef}
        id="zmmtg-root-container"
        className="w-full"
        style={{ position: "relative", minHeight: 600 }}
      />
    </div>
  );
};

export default ZoomMeetingEmbed;