import axios from "axios";

const API_URL = "https://staging.energyelhadad.com/api";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    lang: "en",
  },
});

async function run() {
  console.log("Starting debug...");
  try {
    console.log("Fetching products list...");
    const res = await instance.get("/products");
    console.log("Status:", res.status);

    let id;
    if (Array.isArray(res.data)) {
      id = res.data[0]?.id;
    } else if (res.data?.data && Array.isArray(res.data.data)) {
      id = res.data.data[0]?.id;
    } else if (res.data?.result && Array.isArray(res.data.result)) {
      id = res.data.result[0]?.id; // Adjust based on actual API
    }

    // Fallback or explicit check common patterns
    if (!id && res.data?.data && res.data.data.length > 0)
      id = res.data.data[0].id;

    if (!id) {
      console.log("No ID found in list response. keys:", Object.keys(res.data));
      // Try to find ANY id in nested structures
      console.log("Sample data:", JSON.stringify(res.data).slice(0, 200));
      return;
    }
    console.log("Found ID:", id);

    console.log(`Fetching item ${id}...`);
    const itemRes = await instance.get(`/products/items/${id}`);
    console.log("Item Status:", itemRes.status);

    if (itemRes.data.result) {
      console.log("Item found. Name:", itemRes.data.result.name);
    } else {
      console.log("itemRes.data.result is undefined!");
      console.log("Full data:", JSON.stringify(itemRes.data, null, 2));
    }
  } catch (e) {
    console.error("Error trapped!");
    if (axios.isAxiosError(e)) {
      console.error("Message:", e.message);
      console.error("Code:", e.code);
      if (e.response) {
        console.error("Response Status:", e.response.status);
        console.error("Response Data:", e.response.data);
      }
    } else {
      console.error(e);
    }
  }
}

run();
