import path from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProduction = 'production'

const config = {
    entry: {
        employees: './src/employees.jsx',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    // plugins: [
    //     // ADD ANY WEBPACK PLUGINS HERE. optimization below handles our plugins. 
    // ],
    module: {
        rules: [
            {
                test: /\.jsx?$/, // finds any files with jsx extension
                exclude: /node_modules/,
                loader: 'babel-loader', // we're saying: if you encounter any jsx files, use the babel loader
            },
        ],
    },
    optimization: {
        splitChunks: {
            name: 'vendor', // this changes [name] above to vendor
            chunks: 'all', 
        }
    },
    devtool: 'source-map'
}

export default function() {
    if (isProduction) {
        config.mode = 'production'
    } else {
        config.mode = 'development'
    }
    return config
}