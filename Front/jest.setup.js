import {TextEncoder, TextDecoder} from "util"; // Importa el polyfill

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
