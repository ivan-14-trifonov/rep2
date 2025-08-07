"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { SpecialistProfile } from "@/components/candidates/SpecialistProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { mockCandidates } from "@/lib/mock-data";

export default function CandidatePage() {
  const params = useParams<{ id: string }>();
  const { isAuthenticated, selectedCandidate, setSelectedCandidate } =
    useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // If no selected candidate, try to find by ID
    if (!selectedCandidate) {
      const candidate = mockCandidates.find((c) => c.id === params.id);
      if (candidate) {
        setSelectedCandidate(candidate);
      } else {
        router.push("/dashboard");
      }
    }
  }, [
    isAuthenticated,
    selectedCandidate,
    params.id,
    router,
    setSelectedCandidate,
  ]);

  if (!isAuthenticated || !selectedCandidate) {
    return null;
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Button>

        {/* Candidate Profile */}
        <SpecialistProfile candidate={selectedCandidate} />
      </div>
    </PageLayout>
  );
}
