const API_URL = "http://localhost:3000/quotes";

function createQuoteElement(quoteObj) {
  const article = document.createElement("article");

  const quoteText = document.createElement("p");
  quoteText.className = "quote-text";
  quoteText.textContent = `"${quoteObj.quote}"`;

  const authorText = document.createElement("p");
  authorText.className = "quote-author";
  authorText.textContent = `— ${quoteObj.author}`;

  article.appendChild(quoteText);
  article.appendChild(authorText);

  return article;
}

async function getQuotes() {
  try {
    const response = await fetch(API_URL);
    const quotes = await response.json();

    const quotesList = document.getElementById("quotes-list");
    quotesList.innerHTML = "";

    quotes.forEach(quote => {
      const quoteElement = createQuoteElement(quote);
      quotesList.appendChild(quoteElement);
    });

  } catch (error) {
    console.error("Eroare la obținerea citatelor:", error);
  }
}

window.addEventListener("DOMContentLoaded", getQuotes);

const form = document.getElementById("quote-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const quoteText = document.getElementById("quote-text").value.trim();
  const author = document.getElementById("quote-author").value.trim();

  if (quoteText === "" || author === "") {
    alert("Completează ambele câmpuri!");
    return;
  }

  const newQuote = {
    quote: quoteText,
    author: author
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newQuote)
    });

    form.reset();
    getQuotes();

  } catch (error) {
    console.error("Eroare la adăugarea citatului:", error);
  }
});