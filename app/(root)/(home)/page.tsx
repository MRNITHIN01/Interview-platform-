"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useuserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModel";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";

export default function Home() { 
  const router = useRouter();
  const { isLoading, isInterviewer, } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };
  if (isLoading) return <LoaderUI />;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20201104/pngtree-technology-background-binary-computer-code-vector-illustration-image_458703.jpg')", // Direct image URL for meeting background
      }}
    >
      {/* Overlay to ensure text is legible */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="container max-w-7xl mx-auto p-6 relative z-10">
        {/* WELCOME SECTION */}
        <div className="rounded-lg bg-card p-6 border shadow-sm mb-10 bg-opacity-90">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Welcome back!
          </h1>
          <p className="text-muted-foreground mt-2">
            {isInterviewer
              ? "Manage your interviews and review candidates effectively"
              : "Access your upcoming interviews and preparations"}
          </p>
        </div>
        {isInterviewer ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {QUICK_ACTIONS.map((action) => (
                <ActionCard
                  key={action.title}
                  action={action}
                  onClick={() => handleQuickAction(action.title)}
                />
              ))}
            </div>
            <MeetingModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
              isJoinMeeting={modalType === "join"}
            />
          </>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold">Your Interviews</h1>
              <p className="text-muted-foreground mt-1">View and join your scheduled interviews</p>
            </div>

            <div className="mt-8">
              {interviews === undefined ? (
                <div className="flex justify-center py-12">
                  <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : interviews.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {interviews.map((interview) => (
                    <MeetingCard key={interview._id} interview={interview} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  You have no scheduled interviews at the moment
                </div>
              )}
            </div>
          </>
        )}
        <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-teal-500 via-emerald-600 to-teal-500 py-2">
          <div className="overflow-hidden">
            <div className="whitespace-nowrap animate-marquee text-black text-sm text-center px-6">
              <span>&copy; 2025 MrNithin. All rights reserved. | </span>
              <a
                href="https://www.instagram.com/__mr_nithin__01/?next=%2F&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 mx-3"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/nithin-guguloth-051092333/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 mx-3"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/MRNITHIN01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 mx-3"
              >
                GitHub
              </a>
              <span className="mx-3 text-yellow-400">“The best way to predict the future is to create it.”</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
