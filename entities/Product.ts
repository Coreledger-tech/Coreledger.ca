// Product entity for the Coreledger website

export interface ProductData {
  id: string;
  name: string;
  tagline: string;
  status: "Live" | "Beta" | "Lab";
  href: string;
  description?: string;
}

export class Product {
  static async list(): Promise<ProductData[]> {
    // Mock data for now - in a real app this would fetch from an API
    return [
      {
        id: "contextus",
        name: "Contextus",
        tagline: "Cut Your AI Token Bill by 40% without Upgrading Your Model",
        status: "Live",
        href: "https://contextus.coreledger.ca",
        description: "Your AI scalpel that cuts token costs by 40% without upgrading your model. LLMs have a memory cap, the context window. Every extra token costs money and risks drift or hallucination. Contextus helps your AI prioritize what matters & discard the rest, allowing developers and teams to save 40 percent while improving accuracy."
      },
      {
        id: "reconciler",
        name: "DistilBERT-Reconciler",
        tagline: "AI-powered financial reconciliation using natural language processing.",
        status: "Lab",
        href: "https://github.com/Coreledger-tech/Exception-handling-reconciliation",
        description: "Fine-tuned model for automating post-trade break resolution in financial systems."
      },
      {
        id: "fails-forecaster",
        name: "Settlement Fails Forecaster",
        tagline: "Predictive analytics for settlement risk management.",
        status: "Lab", 
        href: "https://huggingface.co/kelvi23/Streaming-fail-forecaster",
        description: "Machine learning models to predict next-day settlement failures for proactive risk management."
      }
    ];
  }
}
