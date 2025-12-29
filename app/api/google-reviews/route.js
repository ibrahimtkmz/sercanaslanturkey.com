import { NextResponse } from "next/server";

const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;
const GOOGLE_PLACE_URL =
  process.env.NEXT_PUBLIC_GOOGLE_PLACE_URL ||
  "https://www.google.com/maps/place/Sercan+Aslan+-+Hair+Transplant+Turkey/@41.065808,28.9947235,17z/data=!4m6!3m5!1s0x14cab7f4bdbae7ab:0x643f2261dec39eaa!8m2!3d41.065804!4d28.9972984!16s%2Fg%2F11rb3wk1_9?entry=ttu";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey || !GOOGLE_PLACE_ID) {
    return NextResponse.json(
      {
        error: "Google Places API yapılandırması eksik.",
        reviews: [],
        rating: null,
        total: null,
        url: GOOGLE_PLACE_URL,
      },
      { status: 503 }
    );
  }

  try {
    const apiUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    apiUrl.searchParams.set("place_id", GOOGLE_PLACE_ID);
    apiUrl.searchParams.set("fields", "name,rating,user_ratings_total,reviews,url");
    apiUrl.searchParams.set("language", "tr");
    apiUrl.searchParams.set("key", apiKey);

    const response = await fetch(apiUrl.toString(), {
      // Google Places kotasını gereksiz tüketmemek için yanıtı 30 dakika cache'le.
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Google Places yanıtı alınamadı.",
          reviews: [],
          rating: null,
          total: null,
          url: GOOGLE_PLACE_URL,
        },
        { status: 502 }
      );
    }

    const payload = await response.json();

    if (payload.status !== "OK" || !payload.result) {
      return NextResponse.json(
        {
          error: payload.error_message || payload.status || "Google Places yanıtı geçersiz.",
          reviews: [],
          rating: null,
          total: null,
          url: GOOGLE_PLACE_URL,
        },
        { status: 502 }
      );
    }

    const { rating = null, user_ratings_total: total = null, url, reviews = [] } =
      payload.result;

    return NextResponse.json({
      rating,
      total,
      url: url || GOOGLE_PLACE_URL,
      reviews: reviews.map((review) => ({
        author: review.author_name,
        avatar: review.profile_photo_url,
        rating: review.rating,
        time: review.relative_time_description,
        text: review.text,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Google Places isteği başarısız oldu.",
        reviews: [],
        rating: null,
        total: null,
        url: GOOGLE_PLACE_URL,
      },
      { status: 500 }
    );
  }
}
