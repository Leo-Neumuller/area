import TextInput__SvelteComponent_ from "./+TextInput.svelte";

export interface TextInputProps {
    label: string;
    value: any;
    type: string;
    placeholder: string;
    onInput: (e: any) => void;
}

export default TextInput__SvelteComponent_;

