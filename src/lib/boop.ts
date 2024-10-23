import type {ActionReturn} from "svelte/action";

export type TransformFunc = (node: HTMLElement, rotX: number, rotY: number) => void

export interface BoopParams {
    /**
     * The css selector used to locate the element to rotate, sat to undefined will target the current element.
     * Must be a child element of the node the directive is attached too
     */
    selector?: string;
    /**
     * Set to true if you want the css variables to be sat on the node itself, defaults to the selected element
     */
    variablesOnNode?: boolean;
    /**
     * Overrides the initial style sat to the element to enable 3d rotate
     */
    initialStyle?: CSSStyleDeclaration
}

function boop(node: HTMLElement, params?: BoopParams): ActionReturn<BoopParams>  {
    let sx = 0,
        sy = 0,
        dx = 0,
        dy = 0,
        w = 0,
        h = 0

    let rotX = 0
    let rotY = 0
    let targetEl: HTMLElement
    let variablesOnNode = false
    let transform: TransformFunc

    const onMove = (e: PointerEvent) => {
        dx = e.x - sx
        dy = e.y - sy
        dx = dx / w
        dy = dy / h

        rotX = dy * -1
        rotY = dx

        if (variablesOnNode) {
            node.style.setProperty('--rotX', rotX + 'rad')
            node.style.setProperty('--rotY', rotY + 'rad')
        } else {
            targetEl.style.setProperty('--rotX', rotX + 'rad')
            targetEl.style.setProperty('--rotY', rotY + 'rad')
        }

        transform(targetEl, rotX, rotY)
    }

    const onOut = (e: PointerEvent) => {
        node.removeEventListener('pointermove', onMove)
        rotX = 0
        rotY = 0

        if (variablesOnNode) {
            node.style.setProperty('--rotX', rotX + 'rad')
            node.style.setProperty('--rotY', rotY + 'rad')
        } else {
            targetEl.style.setProperty('--rotX', rotX + 'rad')
            targetEl.style.setProperty('--rotY', rotY + 'rad')
        }

        console.log('hello')
    }

    const update = (params?: BoopParams)=>  {
        if (params?.selector) {
            const queryEl = node.querySelector(params.selector)
            if (queryEl) {
                targetEl = queryEl as HTMLElement
            } else {
                throw new Error('Failed to locate child by selector:' + params?.selector)
            }
        } else {
            targetEl = node
        }

        variablesOnNode = params?.variablesOnNode || false

        if (params?.initialStyle) {
            Object.keys(params.initialStyle).forEach(key => {
                // @ts-ignore
                targetEl.style[key] = params!!.initialStyle!![key]
            })
        } else {
            targetEl.style.perspective = '1000px'
            targetEl.style.transformOrigin = 'center center'
            targetEl.style.transition = 'transform 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            targetEl.style.transformStyle = 'preserve-3d'
            targetEl.style.transform = 'rotateX(var(--rotX)) rotateY(var(--rotY))'
        }

        if (targetEl !== node) {
            node.style.perspective = '1000px'
            node.style.transformStyle = 'preserve-3d'
        }
    }

    const onEnter = (e: PointerEvent) => {
        const el = e.currentTarget as HTMLElement
        const {x, y, width, height} = el.getBoundingClientRect();
        w = width /2
        sx = x + w
        h = height /2
        sy = y + h

        node.addEventListener('pointermove', onMove)
        node.addEventListener('pointerout', onOut)
    }

    update(params)
    node.addEventListener('pointerenter', onEnter)

    return {
        update,
        destroy: () => {
            node.removeEventListener('pointermove', onMove)
            node.removeEventListener('pointerout', onOut)
            rotX = 0
            rotY = 0
        }
    }
}

export default boop