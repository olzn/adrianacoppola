import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, RefObject } from "react";
import * as Lucide from "lucide-react";
import { AutoFocusTarget, Sheet, useClientMediaQuery } from "@silk-hq/components";
import { caseStudies, findCaseStudy, type CaseStudy } from "@/data/cases";

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

const CursorPreview = ({
  cursorStudy,
  cursorRef,
}: {
  cursorStudy: CaseStudy | null;
  cursorRef: RefObject<HTMLDivElement | null>;
}) => (
  <div
    ref={cursorRef}
    className="work-cursor"
    data-visible={cursorStudy ? "true" : "false"}
    aria-hidden="true"
  >
    {cursorStudy?.cursorImage ? (
      <img src={cursorStudy.cursorImage} alt="" loading="eager" />
    ) : (
      <span>
        <strong>{cursorStudy?.client}</strong>
        <small>{cursorStudy?.short}</small>
      </span>
    )}
  </div>
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
        detents={isMobile ? "72lvh" : undefined}
        inertOutside={true}
        nativeEdgeSwipePrevention={true}
        onClickOutside={{ dismiss: true, stopOverlayPropagation: true }}
      >
        <Sheet.Backdrop className="case-backdrop" />
        <Sheet.Content className="case-sheet" data-presented={presented}>
          <Sheet.BleedingBackground className="case-sheet__background" />
          <div className="case-sheet__inner">
            <header className="case-sheet__header">
              <div>
                <span className="case-sheet__index">{activeStudy?.index}</span>
                <Sheet.Title className="case-sheet__title">
                  {activeStudy?.client ?? "Case study"}
                </Sheet.Title>
              </div>
              <Sheet.Trigger
                action="dismiss"
                className="case-sheet__close"
                aria-label="Close case study"
              >
                <X aria-hidden="true" />
              </Sheet.Trigger>
            </header>

            {activeStudy?.heroImage ? (
              <img
                className="case-sheet__image"
                src={activeStudy.heroImage}
                alt=""
                loading="eager"
              />
            ) : null}

            <AutoFocusTarget.Root timing="present" className="case-sheet__focus" />
            <Sheet.Description className="case-sheet__summary">
              {activeStudy?.summary}
            </Sheet.Description>

            <dl className="case-sheet__proof">
              {activeStudy?.proof.map((item) => (
                <div key={item}>
                  <dt>Proof</dt>
                  <dd>{item}</dd>
                </div>
              ))}
            </dl>

            <div className="case-sheet__sections">
              {activeStudy?.details.map((section) => (
                <section key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </Sheet.Content>
      </Sheet.View>
    </Sheet.Portal>
  );
};

export default function WorkSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [presented, setPresented] = useState(false);
  const [cursorStudy, setCursorStudy] = useState<CaseStudy | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
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
    setActiveId(study.id);
    setPresented(true);
    replaceCaseParam(study.id);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.transform = `translate3d(${event.clientX + 22}px, ${
      event.clientY - 126
    }px, 0) rotate(-4deg)`;
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
      <div className="work-shell" onPointerMove={handlePointerMove}>
        <ul className="work-list">
          {caseStudies.map((study) => (
            <li key={study.id}>
              <Sheet.Trigger
                asChild
                onPress={() => {
                  setActiveId(study.id);
                }}
              >
                <a
                  className="work-row"
                  href={`?case=${study.id}#work`}
                  onClick={(event) => {
                    event.preventDefault();
                    openCase(study);
                  }}
                  onPointerEnter={() => setCursorStudy(study)}
                  onPointerLeave={() => setCursorStudy(null)}
                >
                  <span className="work-row__index">{study.index}</span>
                  <span className="work-row__client">{study.client}</span>
                  <span className="work-row__short">{study.short}</span>
                  <span className="work-row__result">{study.result}</span>
                  <span className="work-row__arrow" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </a>
              </Sheet.Trigger>
            </li>
          ))}
        </ul>
        <CursorPreview cursorStudy={cursorStudy} cursorRef={cursorRef} />
      </div>

      <CaseSheet
        activeStudy={activeStudy}
        presented={presented}
      />
    </Sheet.Root>
  );
}
