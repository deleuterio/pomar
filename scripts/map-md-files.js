import fs from 'fs';
import yaml from 'yaml';

const postsPath = './content/posts';
const jsonPath = './posts.json';

// Função para ler o conteúdo YAML de um arquivo
function readYamlFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const yamlContent = fileContent.split('---')[1].trim();
    return yaml.parse(yamlContent);
}

// Função para percorrer os arquivos e extrair as informações YAML
function extractYamlFromFiles() {
    const files = fs.readdirSync(postsPath);
    const posts = [];
    console.log(files);
    files.forEach((file) => {
        const filePath = `${postsPath}/${file}/README.md`;
        const post = readYamlFromFile(filePath);
        posts.push({ path: filePath, post });
    });

    return posts;
}

// Extrair as informações YAML dos arquivos e salvar em um JSON
const posts = extractYamlFromFiles();
fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2));

console.log('Informações YAML extraídas e salvas em posts.json');
