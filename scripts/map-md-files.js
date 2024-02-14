import fs from 'fs';
import yaml from 'yaml';

const postsPath = 'posts';
const jsonPath = './src/posts.json';

// Função para ler o conteúdo YAML de um arquivo
function readYamlFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const yamlContent = fileContent.split('---')[1].trim();
    return yaml.parse(yamlContent);
}

// Função para percorrer os arquivos e extrair as informações YAML
function extractYamlFromFiles() {
    const files = fs.readdirSync(`./public/content/${postsPath}`);
    const posts = [];
    files.forEach((file) => {
        const filePath = `./public/content/${postsPath}/${file}/README.md`;
        const post = readYamlFromFile(filePath);
        posts.push({ path: `${postsPath}/${file}/README`, post });
    });

    return posts;
}

// Extrair as informações YAML dos arquivos e salvar em um JSON
const posts = extractYamlFromFiles();
fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2));

console.log('Informações YAML extraídas e salvas em posts.json');
