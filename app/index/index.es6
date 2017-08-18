import m from 'mithril'
import templateBuilder from 'app/converter/template-builder'

const INDENT_2 = '2'
const INDENT_4 = '4'
const INDENT_TAB = 'tab'
const INDENT_OPTIONS = [
  { label: '2 spaces', value: INDENT_2 },
  { label: '4 spaces', value: INDENT_4 },
  { label: 'Tabs', value: INDENT_TAB },
]
const QUOTE_OPTIONS = [
  { label: 'Single quotes', value: { quote: "'", attributeQuote: '"' } },
  { label: 'Double quotes', value: { quote: '"', attributeQuote: "'" } },
]

const Settings = vnode => {
  const doChangeIndent = e => {
    e.preventDefault()
    vnode.attrs.setSettings('indent', e.currentTarget.value)
  }

  const doChangeBracket = e => {
    e.preventDefault()
    vnode.attrs.setSettings('useBracket', e.currentTarget.checked)
  }

  const doChangeQuotes = quotes => e => {
    e.preventDefault()
    vnode.attrs.setSettings('quotes', quotes)
  }

  const view = _ => {
    return m('.w-100.bg-light-gray.black.pa3.flex', { style: { top: '4rem' } },
      m('.w-33',
        m('h4.f6.ma0.mb3.ttu.tracked.near-black', 'Indent'), INDENT_OPTIONS.map(option =>
          m('label.dib.mr3', m(`input.mr1[type=radio][name=ident][value=${option.value}]`, {
            checked: vnode.attrs.getSettings('indent') === option.value,
            onchange: doChangeIndent
          }), option.label)
        )
      ),
      m('.w-33',
        m('h4.f6.ma0.mb3.ttu.tracked.near-black', 'Quotes'), QUOTE_OPTIONS.map(option =>
          m('label.dib.mr3', m(`input.mr1[type=radio][name=quotes][value=${option.value}]`, {
            checked: vnode.attrs.getSettings('quotes') === option.value,
            onchange: doChangeQuotes(option.value)
          }), option.label)
        )
      ),
      m('.w-33',
        m('label.f6.fw6.ma0.mb3.ttu.tracked.near-black', m(`input.mr1[type=checkbox]`, {
          checked: vnode.attrs.getSettings('useBracket'),
          onchange: doChangeBracket
        }), 'Use brackets for children nodes')
      )
    )
  }

  return { view }
}

const App = vnode => {
  const state = {
    source: '',
    output: '',
    settingsOpen: true,
    settings: {
      indent: INDENT_2,
      useBracket: false,
      quotes: QUOTE_OPTIONS[0].value
    }
  };

  const getSettings = key => state.settings[key]
  const setSettings = (key, value) => (state.settings[key] = value)

  const doSetSource = e => {
    e.preventDefault()
    state.source = e.currentTarget.value
  }

  const getOutput = _ => templateBuilder({
    source: state.source,
    indent: state.settings.indent,
    quotes: state.settings.quotes,
    useBracket: state.settings.useBracket
  })

  const doToggleSettings = e => {
    e.preventDefault()
    state.settingsOpen = !state.settingsOpen
  }

  const buildSettingAlert = _ => {
    const opts = []

    const { indent, quotes } = state.settings
    const currentIndent = INDENT_OPTIONS.filter(option => option.value === indent)
    if (currentIndent[0]) opts.push(m('span.mr4.light-red[title=Indentation]', `${currentIndent[0].label}`))

    const currentQuote = QUOTE_OPTIONS.filter(option => option.value === quotes)
    if (currentQuote[0]) opts.push(m('span.mr4.light-red[title=Quoting]', `${currentQuote[0].label}`))

    return opts
  }

  const view = _ => {
    return m('.flex.flex-wrap',
      m('.w-100.pa3.bg-dark-gray.near-white.h3.flex.items-center.justify-between',
        m('',
          m('h1.dib.ttu.tracked.f5.fw6.ma0', 'Mithril Template Converter'),
          m('span.ml4.f6', 'A fork from ', m('a.light-blue[href="https://github.com/ArthurClemens/mithril-template-converter"]', 'ArthurClemens/mithril-template-converter')),
        ),
        m('',
          m('span.f6.ml4.ml-auto', buildSettingAlert()),
          m('a[href=#]', { onclick: doToggleSettings }, `Settings ${state.settingsOpen ? '▲' : '▼'}`)
        )
      ),
      state.settingsOpen ? m(Settings, { getSettings, setSettings }) : null,
      m('.w-50.ph3.pv4',
        m('textarea.pa2.bg-light-gray.br2.bn.code.f6.w-100[placeholder="Enter your code"]', {
          oninput: doSetSource,
          style: { minHeight: '70vh' }
        })
      ),
      m('.w-50.ph3.pv4',
        m('textarea.pa2.bg-light-gray.br2.bn.code.f6.w-100[placeholder="Mithril template will appear here. MAGIC!"]', {
          value: getOutput(),
          style: { minHeight: '70vh' }
        })
      )
    )
  }
  return { view }
}

m.mount(document.body, App)
