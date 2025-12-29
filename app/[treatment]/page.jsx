"use client";

import { LandingPage } from "../page";

export default function TreatmentPage({ params }) {
  return <LandingPage initialSlug={params.treatment} />;
}
