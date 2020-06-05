import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatusComponent", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="test"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test");
    });
    test("after creation span should be display", () => {
        const component = create(<ProfileStatus status="test"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation span should contains correct status", () => {
        const component = create(<ProfileStatus status="test"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("test");
    });
    test("after creation input should`nt be display", () => {
        const component = create(<ProfileStatus status="test"/>);
        const root = component.root;
        expect(() => {
            const input = root.findByType("input");
        }).toThrow()
    });
    test("after creation span should be display editMode instead of span", () => {
        const component = create(<ProfileStatus status="test"/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("test");
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="test" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });

});