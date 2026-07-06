import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, SyntheticEvent } from "react";
import * as Lucide from "lucide-react";
import { AutoFocusTarget, Scroll, Sheet, useClientMediaQuery } from "@silk-hq/components";
import { caseStudies, findCaseStudy, logoDevUrl, type CaseStudy } from "@/data/cases";

const { ArrowRight, X } = Lucide;

const getCaseFromUrl = () => {
  if (typeof window === "undefined") return null;
  return findCaseStudy(new URL(window.location.href).searchParams.get("case"));
};

const replaceCaseParam = (id: string | null) => {
  const url = new URL(window.location.href);

  if (id) {
    url.searchParams.set("case", id);
    url.hash = "work";
    window.history.pushState({ case: id }, "", url);
    return;
  }

  url.searchParams.delete("case");
  window.history.replaceState({}, "", url);
};

const WorkRowPreview = ({ study }: { study: CaseStudy }) => {
  const previewImage = study.heroImage ?? study.cursorImage;
  const clientInitial = study.client.replace(/^The\s+/i, "").charAt(0);
  const logoUrl = logoDevUrl(study.logoDomain, { size: 96 });
  const handleLogoError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.hidden = true;
    event.currentTarget.parentElement?.setAttribute("data-logo-missing", "true");
  };

  return (
    <span className="work-row__preview" data-has-image={previewImage ? "true" : "false"} aria-hidden="true">
      {previewImage ? (
        <img src={previewImage} alt="" loading="eager" />
      ) : (
        <span className="work-row__preview-logo" data-logo-missing="false">
          <img src={logoUrl} alt="" loading="lazy" onError={handleLogoError} />
          <span>{clientInitial}</span>
        </span>
      )}
    </span>
  );
};

const CaseCloseButton = ({ className = "" }: { className?: string }) => (
  <Sheet.Trigger
    action="dismiss"
    className={`case-sheet__close${className ? ` ${className}` : ""}`}
    aria-label="Close case study"
  >
    <X aria-hidden="true" />
  </Sheet.Trigger>
);

const CaseMasthead = ({ study }: { study: CaseStudy }) => {
  const clientInitial = study.client.replace(/^The\s+/i, "").charAt(0);
  const logoUrl = logoDevUrl(study.logoDomain, { size: 96 });
  const handleLogoError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.hidden = true;
    event.currentTarget.parentElement?.setAttribute("data-logo-missing", "true");
  };

  return (
    <header className="case-sheet__masthead" aria-label={`${study.client} case study`}>
      <figure className="case-sheet__masthead-media">
        {study.heroImage ? (
          <img src={study.heroImage} alt={study.heroAlt ?? ""} loading="eager" />
        ) : (
          <span className="case-sheet__masthead-placeholder" aria-hidden="true" />
        )}
      </figure>

      <span className="case-sheet__masthead-index">{study.index}</span>
      <CaseCloseButton className="case-sheet__masthead-close" />

      <div className="case-sheet__masthead-body">
        <div className="case-sheet__brand-row">
          <span className="case-sheet__brand-mark" data-logo-missing="false" aria-hidden="true">
            <img src={logoUrl} alt="" loading="eager" onError={handleLogoError} />
            <span>{clientInitial}</span>
          </span>
          <Sheet.Title className="case-sheet__brand-name">{study.client}</Sheet.Title>
        </div>

        <dl className="case-sheet__brief">
          <div>
            <dt>Brief</dt>
            <dd>{study.short}</dd>
          </div>
          <div>
            <dt>Result</dt>
            <dd>{study.result}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
};

const CaseEvidence = ({ study }: { study: CaseStudy }) => (
  <section className="case-sheet__evidence" aria-label="Evidence">
    <h3>Evidence</h3>
    <ul>
      {study.proof.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>
);

const CaseSheet = ({
  activeStudy,
  presented,
}: {
  activeStudy: CaseStudy | null;
  presented: boolean;
}) => {
  const isMobile = useClientMediaQuery("(max-width: 767px)");
  const placement = isMobile ? "bottom" : "right";

  return (
    <Sheet.Portal>
      <Sheet.View
        className="case-view"
        contentPlacement={placement}
        tracks={placement}
        inertOutside={true}
        nativeEdgeSwipePrevention={!isMobile}
        onClickOutside={{ dismiss: true, stopOverlayPropagation: true }}
      >
        <Sheet.Backdrop className="case-backdrop" />
        <Sheet.Content className="case-sheet" data-presented={presented}>
          <Sheet.BleedingBackground className="case-sheet__background" />
          {isMobile ? (
            <Sheet.Handle className="case-sheet__handle" onPress={{ runAction: false }}>
              Drag case study
            </Sheet.Handle>
          ) : null}
          <Scroll.Root asChild>
            <div className="case-sheet__scroll">
              <Scroll.View className="case-sheet__scroll-view" axis="y" safeArea="visual-viewport">
                <Scroll.Content className="case-sheet__inner">
                  {activeStudy ? <CaseMasthead study={activeStudy} /> : null}

                  <AutoFocusTarget.Root timing="present" className="case-sheet__focus" />
                  <section className="case-sheet__intro">
                    <Sheet.Description className="case-sheet__summary">
                      {activeStudy?.summary}
                    </Sheet.Description>
                  </section>

                  {activeStudy ? <CaseEvidence study={activeStudy} /> : null}

                  <div className="case-sheet__sections">
                    {activeStudy?.details.map((section) => (
                      <section key={section.title}>
                        <h3>{section.title}</h3>
                        <p>{section.body}</p>
                      </section>
                    ))}
                  </div>
                </Scroll.Content>
              </Scroll.View>
            </div>
          </Scroll.Root>
        </Sheet.Content>
      </Sheet.View>
    </Sheet.Portal>
  );
};

export default function WorkSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [presented, setPresented] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const activeStudy = useMemo(() => findCaseStudy(activeId), [activeId]);

  useEffect(() => {
    const syncFromUrl = () => {
      const urlStudy = getCaseFromUrl();
      setActiveId(urlStudy?.id ?? null);
      setPresented(Boolean(urlStudy));
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);

    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const openCase = (study: CaseStudy) => {
    setPreviewId(null);
    setActiveId(study.id);
    setPresented(true);
    replaceCaseParam(study.id);
  };

  const clearPreview = (id: string) => {
    setPreviewId((currentId) => (currentId === id ? null : currentId));
  };

  return (
    <Sheet.Root
      license="commercial"
      presented={presented}
      onPresentedChange={(nextPresented) => {
        setPresented(nextPresented);
        if (!nextPresented) replaceCaseParam(null);
      }}
      sheetRole="dialog"
    >
      <div className="work-shell" data-preview-active={previewId ? "true" : "false"}>
        <ul className="work-list">
          {caseStudies.map((study, index) => {
            const row = (
              <a
                className="work-row"
                data-active={previewId === study.id ? "true" : "false"}
                href={`?case=${study.id}#work`}
                onClick={(event) => {
                  event.preventDefault();
                  openCase(study);
                }}
                onFocus={() => setPreviewId(study.id)}
                onBlur={() => clearPreview(study.id)}
                onPointerEnter={() => setPreviewId(study.id)}
                onPointerLeave={() => clearPreview(study.id)}
              >
                <span className="work-row__index">{study.index}</span>
                <span className="work-row__client">{study.client}</span>
                <span className="work-row__short">{study.short}</span>
                <span className="work-row__result">{study.result}</span>
                <WorkRowPreview study={study} />
                <span className="work-row__arrow" aria-hidden="true">
                  <ArrowRight />
                </span>
              </a>
            );

            return (
              <li
                key={study.id}
                data-case-id={study.id}
                data-reveal
                suppressHydrationWarning
                style={{
                  "--reveal-delay": `${Math.min(index, 6) * 55}ms`,
                  "--reveal-duration": "360ms",
                } as CSSProperties}
              >
                {activeId === study.id ? (
                  <AutoFocusTarget.Root asChild timing="dismiss">
                    {row}
                  </AutoFocusTarget.Root>
                ) : (
                  row
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <CaseSheet
        activeStudy={activeStudy}
        presented={presented}
      />
    </Sheet.Root>
  );
}
