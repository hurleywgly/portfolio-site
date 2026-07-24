import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { SECTION_HEADERS } from "@/lib/constants"
import type { Project } from "@/lib/types"
import { projects } from "@/lib/data"

function formatText(text: string | undefined) {
  if (!text) return null;

  // Helper function to process inline formatting
  function processInlineFormatting(text: string) {
    // Handle bold text (**text**)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Handle underlined text (__text__)
    text = text.replace(/__(.*?)__/g, '<u>$1</u>');
    return text;
  }

  // Split text into paragraphs and process each one
  const paragraphs = text.split('\n\n');
  
  return paragraphs.map((paragraph, i) => {
    // Process any inline formatting
    const processedText = processInlineFormatting(paragraph);
    
    // Check if the paragraph contains bullet points
    if (paragraph.includes('•')) {
      const items = paragraph.split('•').filter(item => item.trim());
      return (
        <ul key={i} className="list-disc pl-6 space-y-2">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: processInlineFormatting(item.trim()) }} />
          ))}
        </ul>
      );
    }
    
    // Regular paragraph
    return (
      <p 
        key={i} 
        dangerouslySetInnerHTML={{ __html: processedText }}
        className="text-muted-foreground"
      />
    );
  });
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  let buttonText = "Visit Prototype";
  if (project.id === "stumble-ai" || project.id === "bookshelf") {
    buttonText = "Visit Website";
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>

        <div className="relative aspect-[1200/630] mb-8 overflow-hidden rounded-lg border">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{project.description}</p>

        <div className="mb-8">
          <a
            href={project.prototypeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            {buttonText}
          </a>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.PROBLEM_STATEMENT}</h2>
            <div className="space-y-4">
              {formatText(project.problemStatement)}
            </div>
          </section>

          {project.myRole && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.MY_ROLE}</h2>
              <div className="space-y-4">
                {formatText(project.myRole)}
              </div>
            </section>
          )}

          {project.processOverview && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.PROCESS_OVERVIEW}</h2>
              <div className="space-y-4">
                {formatText(project.processOverview)}
              </div>
            </section>
          )}

          {project.technicalInnovation && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.TECHNICAL_INNOVATION}</h2>
              <div className="space-y-4">
                {formatText(project.technicalInnovation)}
              </div>
            </section>
          )}

          {project.technologyHighlights && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.TECHNOLOGY_HIGHLIGHTS}</h2>
              <div className="space-y-4">
                {formatText(project.technologyHighlights)}
              </div>
            </section>
          )}

          {project.impact && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.IMPACT}</h2>
              <div className="space-y-4">
                {formatText(project.impact)}
              </div>
            </section>
          )}

          {project.strategicExecution && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.STRATEGIC_EXECUTION}</h2>
              <div className="space-y-4">
                {formatText(project.strategicExecution)}
              </div>
            </section>
          )}

          {project.stakeholderManagement && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.STAKEHOLDER_MANAGEMENT}</h2>
              <div className="space-y-4">
                {formatText(project.stakeholderManagement)}
              </div>
            </section>
          )}

          {project.impactAndLegacy && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.IMPACT_AND_LEGACY}</h2>
              <div className="space-y-4">
                {formatText(project.impactAndLegacy)}
              </div>
            </section>
          )}

          {project.customerAndStakeholderFeedback && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.CUSTOMER_FEEDBACK}</h2>
              <div className="space-y-4">
                {formatText(project.customerAndStakeholderFeedback)}
              </div>
            </section>
          )}

          {project.keyLearnings && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.KEY_LEARNINGS}</h2>
              <div className="space-y-4">
                {formatText(project.keyLearnings)}
              </div>
            </section>
          )}

          {project.lessonsLearned && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{SECTION_HEADERS.LESSONS_LEARNED}</h2>
              <div className="space-y-4">
                {formatText(project.lessonsLearned)}
              </div>
            </section>
          )}
        </div>

        <div className="mt-16 p-4 bg-muted/50 rounded-lg">
          <h2 className="font-semibold mb-2">About this site</h2>
          <p className="text-sm text-muted-foreground">
            This site was built using code assists from Cursor, Claude, and 
            ChatGPT and is currently hosted on Netlify. Prototypes were built 
            using Replit, v0, Bolt, and more.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

