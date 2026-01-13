import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = Object.fromEntries(formData);
    }

    const { phone_number, password } = body;

    console.log("phone_number", phone_number);
    console.log("password", password);

    // Case: Login Failed (Invalid credentials)
    if (phone_number === "01000000000") {
      return NextResponse.json(
        {
          non_field_errors: ["Invalid credentials"],
        },
        { status: 400 },
      );
    }

    // Case: Too Many Requests
    if (phone_number === "01111111111") {
      return NextResponse.json(
        {
          detail: "Too many requests. Please try again in 5 seconds.",
          retry_after_seconds: 5,
          retry_after: "5 seconds",
        },
        { status: 429 },
      );
    }

    // Case: Success
    // Default success for any other phone number
    return NextResponse.json(
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwicGhvbmVfbnVtYmVyIjoiMDEwMjQ1NDY5ODIifQ.tVkNUoSII2kEhurr-phddT4dNP1pvH8dd2ggCUFYv_o",
        user: {
          id: 10,
          phone_number: phone_number || "01024546982",
          first_name: "Fathi",
          last_name: "Mohammed",
          email: "",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Invalid request body or content type" },
      { status: 400 },
    );
  }
}
