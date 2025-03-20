export async function submitForm(formData: FormData) {
    try {
      const response = await fetch("https://your-backend-api.com/submit", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
  
      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }
  