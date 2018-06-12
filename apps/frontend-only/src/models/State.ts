import {model, field} from 'metatonic-core';

@model()
export class State {
    @field('text', 'Abbreviation')
    $value;

    @field('text', 'Name')
    $description;
}