export interface VoiceCommand {
  command: string;
  action: () => void;
  keywords: string[];
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
    SpeechRecognition?: SpeechRecognitionConstructor;
  }
}

class VoiceCommandManager {
  private static instance: VoiceCommandManager;
  private recognition: SpeechRecognitionInstance | null = null;
  private isListening: boolean = false;
  private readonly commands: VoiceCommand[] = [];
  private listeners: ((transcript: string) => void)[] = [];

  static getInstance() {
    if (!VoiceCommandManager.instance) {
      VoiceCommandManager.instance = new VoiceCommandManager();
    }
    return VoiceCommandManager.instance;
  }

  init() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
          this.processCommand(transcript);
          this.listeners.forEach(listener => listener(transcript));
        };
      }
    }
  }

  registerCommand(command: VoiceCommand) {
    this.commands.push(command);
  }

  private processCommand(transcript: string) {
    for (const cmd of this.commands) {
      if (cmd.keywords.some(keyword => transcript.includes(keyword))) {
        cmd.action();
        break;
      }
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = true;
    }
  }

  isSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  subscribe(listener: (transcript: string) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export default VoiceCommandManager.getInstance();