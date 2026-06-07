import { useEffect, useMemo, useRef, useState } from 'react'
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, type SimulationNodeDatum } from 'd3-force'
import type { Lang, LinkItem, NodeItem, Track } from './content'

interface GraphNode extends SimulationNodeDatum {
  id: string
  item: NodeItem
  radius: number
}

interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
  label: string
}

interface NetworkGraphProps {
  nodes: NodeItem[]
  links: LinkItem[]
  lang: Lang
  track: Track
  selectedId: string
  onSelect: (id: string) => void
}

function linkId(value: string | GraphNode): string {
  return typeof value === 'string' ? value : value.id
}

export function NetworkGraph({ nodes, links, lang, track, selectedId, onSelect }: NetworkGraphProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ width: 720, height: 520 })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!wrapRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      setSize({
        width: Math.max(320, entry.contentRect.width),
        height: Math.max(380, entry.contentRect.height),
      })
    })
    observer.observe(wrapRef.current)
    return () => observer.disconnect()
  }, [])

  const graph = useMemo(() => {
    const visible = nodes.filter((node) => node.track === track || node.id === 'jung')
    const ids = new Set(visible.map((node) => node.id))
    const graphNodes: GraphNode[] = visible.map((item, index) => ({
      id: item.id,
      item,
      radius: 22 + item.weight * 0.9,
      x: size.width / 2 + Math.cos(index) * 120,
      y: size.height / 2 + Math.sin(index) * 120,
    }))
    const graphLinks: GraphLink[] = links
      .filter((link) => ids.has(link.source) && ids.has(link.target))
      .map((link) => ({ source: link.source, target: link.target, label: link.label[lang] }))
    return { graphNodes, graphLinks }
  }, [lang, links, nodes, size.height, size.width, track])

  useEffect(() => {
    const simulation = forceSimulation(graph.graphNodes)
      .force('charge', forceManyBody().strength(-260))
      .force('center', forceCenter(size.width / 2, size.height / 2))
      .force('collision', forceCollide<GraphNode>().radius((node) => node.radius + 12))
      .force('link', forceLink<GraphNode, GraphLink>(graph.graphLinks).id((node) => node.id).distance(150).strength(0.6))
      .alpha(0.95)
      .alphaDecay(0.035)
      .on('tick', () => setTick((value) => value + 1))

    return () => {
      simulation.stop()
    }
  }, [graph, size.height, size.width])

  void tick

  return (
    <div className="graph-shell" ref={wrapRef}>
      <svg className="graph" viewBox={`0 0 ${size.width} ${size.height}`} role="img">
        <defs>
          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1f2f35" floodOpacity="0.14" />
          </filter>
        </defs>
        <g>
          {graph.graphLinks.map((link, index) => {
            const source = typeof link.source === 'string' ? graph.graphNodes.find((node) => node.id === link.source) : link.source
            const target = typeof link.target === 'string' ? graph.graphNodes.find((node) => node.id === link.target) : link.target
            if (!source || !target) return null
            const active = linkId(link.source) === selectedId || linkId(link.target) === selectedId
            return (
              <g key={`${linkId(link.source)}-${linkId(link.target)}-${index}`} className={active ? 'edge active' : 'edge'}>
                <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} />
                <text x={((source.x ?? 0) + (target.x ?? 0)) / 2} y={((source.y ?? 0) + (target.y ?? 0)) / 2}>
                  {link.label}
                </text>
              </g>
            )
          })}
        </g>
        <g>
          {graph.graphNodes.map((node) => {
            const selected = node.id === selectedId
            return (
              <g
                className={selected ? 'bubble selected' : 'bubble'}
                key={node.id}
                transform={`translate(${node.x ?? size.width / 2}, ${node.y ?? size.height / 2})`}
                onClick={() => onSelect(node.id)}
                tabIndex={0}
                role="button"
                aria-label={node.item.title[lang]}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') onSelect(node.id)
                }}
              >
                <circle r={node.radius} fill={node.item.color} filter="url(#softShadow)" />
                <circle className="bubble-ring" r={node.radius + 4} />
                <text className="bubble-title" y="-3">
                  {node.item.title[lang]}
                </text>
                <text className="bubble-year" y="19">
                  {node.item.year ?? node.item.tags[0]}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
