/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { LitElement, property, html, TemplateResult } from 'lit-element';

export default class ButtonBase extends LitElement {
    @property({ type: Boolean, reflect: true })
    protected disabled: boolean = false;

    @property()
    protected href: string | undefined = undefined;

    protected constructor() {
        super();
        this.addEventListener('focus', () => {
            if (this.shadowRoot) {
                let button: HTMLElement | null = this.shadowRoot.querySelector(
                    '#button'
                );
                if (button) button.focus();
            }
        });
    }

    private get shadowButtonTabIndex(): number {
        if (this.disabled) {
            return -1;
        }
        if (this.hasAttribute('tabindex')) {
            return this.tabIndex;
        }
        return 0;
    }

    protected render(): TemplateResult {
        return html`
            <button tabindex="${this.shadowButtonTabIndex}" id="button">
                <div id="icon"><slot name="icon"></slot></div>
                <span id="label"><slot></slot></span>
            </button>
        `;
    }
}