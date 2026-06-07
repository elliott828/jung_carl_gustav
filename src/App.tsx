import { BookOpen, ExternalLink, Languages, MapPin, Search, Sparkles } from 'lucide-react'
import type React from 'react'
import { useMemo, useState } from 'react'
import { copy, links, nodes, type Lang, type NodeItem, type Track } from './content'
import { NetworkGraph } from './NetworkGraph'
import './styles.css'

const languages: Array<{ id: Lang; label: string }> = [
  { id: 'zh', label: '中文' },
  { id: 'en', label: 'EN' },
  { id: 'ja', label: '日本語' },
]

function byId(id: string): NodeItem {
  return nodes.find((node) => node.id === id) ?? nodes[0]
}

function App() {
  const [lang, setLang] = useState<Lang>('zh')
  const [track, setTrack] = useState<Track>('people')
  const [selectedId, setSelectedId] = useState('jung')
  const [query, setQuery] = useState('')

  const selected = byId(selectedId)
  const filteredNodes = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return nodes
    return nodes.filter((node) => {
      const text = [node.title.zh, node.title.en, node.title.ja, node.subtitle[lang], node.tags.join(' ')].join(' ').toLowerCase()
      return text.includes(term)
    })
  }, [lang, query])

  const trackItems = filteredNodes.filter((node) => node.track === track)

  return (
    <main>
      <header className="topbar">
          <div className="brand">
          <Sparkles size={25} aria-hidden />
          <div>
            <h1>{copy.appTitle[lang]}</h1>
            <p>{copy.appSubtitle[lang]}</p>
          </div>
        </div>
        <div className="controls">
          <div className="search">
            <Search size={16} aria-hidden />
            <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search" />
          </div>
          <div className="segmented" aria-label="Language">
            <Languages size={16} aria-hidden />
            {languages.map((item) => (
              <button key={item.id} className={lang === item.id ? 'active' : ''} onClick={() => setLang(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="workspace">
        <aside className="rail">
          <div className="tabs" aria-label="Track">
            <button className={track === 'people' ? 'active' : ''} onClick={() => setTrack('people')}>
              {copy.people[lang]}
            </button>
            <button className={track === 'theories' ? 'active' : ''} onClick={() => setTrack('theories')}>
              {copy.theories[lang]}
            </button>
          </div>
          <p className="hint">{copy.selectedHint[lang]}</p>
          <div className="node-list">
            {trackItems.map((node) => (
              <button key={node.id} className={selectedId === node.id ? 'node-row active' : 'node-row'} onClick={() => setSelectedId(node.id)}>
                <span style={{ background: node.color }} />
                <strong>{node.title[lang]}</strong>
                <small>
                  {node.generation ? `${node.generation} · ` : ''}
                  {node.firstContact ? `${node.firstContact} · ` : ''}
                  {node.subtitle[lang]}
                </small>
              </button>
            ))}
          </div>
        </aside>

        <section className="map-area">
          <NetworkGraph nodes={filteredNodes} links={links} lang={lang} track={track} selectedId={selectedId} onSelect={setSelectedId} />
        </section>

        <DetailPanel item={selected} lang={lang} />
      </section>
    </main>
  )
}

function DetailPanel({ item, lang }: { item: NodeItem; lang: Lang }) {
  const related = item.related.map(byId).filter(Boolean)
  return (
    <aside className="detail">
      <div className="portrait-block" style={{ '--accent': item.color } as React.CSSProperties}>
        {item.photoUrl ? (
          <img src={item.photoUrl} alt={item.title[lang]} />
        ) : (
          <div className="portrait-fallback" aria-hidden>
            {item.title.en
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)}
          </div>
        )}
        <div className="portrait-meta">
          <span className="type">{item.track === 'people' ? copy.people[lang] : copy.theories[lang]}</span>
          <h2>{item.title[lang]}</h2>
          <p>{item.subtitle[lang]}</p>
          {item.photoCredit ? <small>{item.photoCredit}</small> : null}
        </div>
      </div>
      <p className="summary">{item.summary[lang]}</p>

      {item.track === 'people' ? (
        <section className="profile-grid">
          <InfoPill label={copy.nationality[lang]} value={item.nationality?.[lang]} />
          <InfoPill label={copy.generation[lang]} value={item.generation} />
          <InfoPill label={copy.firstContact[lang]} value={item.firstContact} />
          <InfoPill label={copy.places[lang]} value={item.places?.[lang]} wide />
        </section>
      ) : null}

      {item.sections?.length ? (
        <section>
          <h3>{copy.profile[lang]}</h3>
          <div className="section-stack">
            {item.sections.map((section) => (
              <details key={section.title.zh} open>
                <summary>{section.title[lang]}</summary>
                <p>{section.body[lang]}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h3>{copy.timeline[lang]}</h3>
        <ol className="timeline">
          {item.timeline.map((entry) => (
            <li key={`${item.id}-${entry.year}`}>
              <strong>{entry.year}</strong>
              <span>{entry.text[lang]}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3>{copy.achievements[lang]}</h3>
        <ul>
          {item.achievements.map((entry) => (
            <li key={entry.zh}>{entry[lang]}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>{copy.works[lang]}</h3>
        <div className="book-grid">
          {item.works.map((entry) => (
            <article className="book-card" key={entry.title.zh}>
              <div className="book-cover">
                {entry.coverUrl ? <img src={entry.coverUrl} alt={entry.title[lang]} /> : <BookOpen size={28} aria-hidden />}
              </div>
              <div>
                <strong>{entry.title[lang]}</strong>
                {entry.links?.length ? (
                  <div className="book-links">
                    {entry.links.map((link) => (
                      <a key={`${entry.title.zh}-${link.lang}`} href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3>{copy.influence[lang]}</h3>
        <p>{item.influence[lang]}</p>
      </section>

      <section>
        <h3>{copy.related[lang]}</h3>
        <div className="chips">
          {related.map((entry) => (
            <span key={entry.id}>{entry.title[lang]}</span>
          ))}
        </div>
      </section>

      <section>
        <h3>{copy.sources[lang]}</h3>
        <p className="source-note">{copy.sourceNote[lang]}</p>
        <ul className="sources">
          {item.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.label}
                <ExternalLink size={13} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

function InfoPill({ label, value, wide }: { label: string; value?: string; wide?: boolean }) {
  if (!value) return null
  return (
    <div className={wide ? 'info-pill wide' : 'info-pill'}>
      <small>{label}</small>
      <span>
        {wide ? <MapPin size={13} aria-hidden /> : null}
        {value}
      </span>
    </div>
  )
}

export default App
