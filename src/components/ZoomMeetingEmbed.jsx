import React, { useEffect, useRef } from "react";

// Uses @zoom/meetingsdk (Embedded Client) so the meeting UI renders
// fully inside our own page - no redirect to zoom.us, no Zoom branding.
// Docs: https://developers.zoom.us/docs/meeting-sdk/web/embedded/
const ZoomMeetingEmbed = ({ meetingConfig, userName, onLeave }) => {
  const containerRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const startMeeting = async () => {
      // Dynamic import keeps initial bundle small since this SDK is heavy
      const { default: ZoomMtgEmbedded } = await import("@zoom/meetingsdk/embedded");

      const client = ZoomMtgEmbedded.createClient();
      clientRef.current = client;

      if (!isMounted || !containerRef.current) return;

      await client.init({
        zoomAppRoot: containerRef.current,
        language: "en-US",
        customize: {
          video: { isResizable: true, viewSizes: { default: { width: 1000, height: 600 } } },
          // Hides Zoom's own branding elements as much as the SDK allows
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
    <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-black">
      <div ref={containerRef} id="zmmtg-root-container" className="w-full h-full" />
    </div>
  );
};

export default ZoomMeetingEmbed;
