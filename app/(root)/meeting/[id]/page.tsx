"use client";

import LoaderUI from "@/components/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallByld";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

function MeetingPage() {
  const { id } = useParams();
  const { isLoaded } = useUser();

  const { call, isCallLoading } = useGetCallById(id as string);

  const [isSetupComplete, setIsSetupComplete] = useState(false);
  if (!id) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Error: Invalid meeting ID</p>
      </div>
    );
  }

  if (!isLoaded || isCallLoading) return <LoaderUI />;

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not founddd</p>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
}
export default MeetingPage;