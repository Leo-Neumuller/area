import TextInput__SvelteComponent_ from "./+TextInput.svelte";

export interface TextInputProps {
    label: string;
    value: any;
    type: string;
    placeholder: string;
    onInput: (e: any) => void;
    deactivated?: boolean;
}

export default TextInput__SvelteComponent_;

