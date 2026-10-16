import ollama from 'ollama'

async function main() {
  const res = await ollama.embeddings({
    model: 'nomic-embed-text:latest',
    prompt: 'RAG是什么?'
  })

  console.log(res)
}

main()