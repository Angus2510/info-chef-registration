/**
 * Client-side email sender that uses the API route
 */
export const sendEmail = async (
  email: string,
  title: string,
  message: string
) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, title, message }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
