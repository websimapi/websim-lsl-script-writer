document.addEventListener('DOMContentLoaded', function() {
    // Initialize global variables
    const editor = document.getElementById('scriptEditor');
    const lineNumbers = document.getElementById('lineNumbers');
    const referenceList = document.getElementById('referenceList');
    const documentationContent = document.getElementById('documentationContent');
    const searchInput = document.getElementById('searchInput');
    const categoryList = document.getElementById('categoryList');
    const newScriptBtn = document.getElementById('newScript');
    const saveScriptBtn = document.getElementById('saveScript');
    const copyScriptBtn = document.getElementById('copyScript');
    const templateButtons = document.querySelectorAll('.template-buttons button');
    
    // Create category tabs for mobile view
    createCategoryTabs();
    
    // LSL data with all functions
    const lslData = {
        functions: {
            // Mathematical Functions
            llAbs: {
                signature: "integer llAbs(integer value)",
                description: "Returns the absolute value of an integer.",
                params: [
                    { name: "value", type: "integer", description: "The value to get the absolute value of." }
                ],
                returnType: "integer",
                examples: ["integer posValue = llAbs(-5); // posValue will be 5"]
            },
            llAcos: {
                signature: "float llAcos(float val)",
                description: "Returns the arc cosine of a float value in radians.",
                params: [
                    { name: "val", type: "float", description: "The value to get the arc cosine of. Must be between -1.0 and 1.0." }
                ],
                returnType: "float",
                examples: ["float angle = llAcos(0.5); // angle will be about 1.047 radians (60 degrees)"]
            },
            llAsin: {
                signature: "float llAsin(float val)",
                description: "Returns the arc sine of a float value in radians.",
                params: [
                    { name: "val", type: "float", description: "The value to get the arc sine of. Must be between -1.0 and 1.0." }
                ],
                returnType: "float",
                examples: ["float angle = llAsin(0.5); // angle will be about 0.5236 radians (30 degrees)"]
            },
            llAtan2: {
                signature: "float llAtan2(float y, float x)",
                description: "Returns the arc tangent of y/x in radians.",
                params: [
                    { name: "y", type: "float", description: "The y component." },
                    { name: "x", type: "float", description: "The x component." }
                ],
                returnType: "float",
                examples: ["float angle = llAtan2(1.0, 1.0); // angle will be about 0.7854 radians (45 degrees)"]
            },
            llCeil: {
                signature: "integer llCeil(float val)",
                description: "Returns the smallest integer greater than or equal to val.",
                params: [
                    { name: "val", type: "float", description: "The value to get the ceiling of." }
                ],
                returnType: "integer",
                examples: ["integer result = llCeil(3.2); // result will be 4"]
            },
            llCos: {
                signature: "float llCos(float theta)",
                description: "Returns the cosine of theta (in radians).",
                params: [
                    { name: "theta", type: "float", description: "The angle in radians." }
                ],
                returnType: "float",
                examples: ["float result = llCos(PI); // result will be -1.0"]
            },
            llDegreesToRadians: {
                signature: "float llDegreesToRadians(float degrees)",
                description: "Converts degrees to radians.",
                params: [
                    { name: "degrees", type: "float", description: "The angle in degrees." }
                ],
                returnType: "float",
                examples: ["float radians = llDegreesToRadians(90.0); // radians will be about 1.5708 (PI/2)"]
            },
            llFloor: {
                signature: "integer llFloor(float val)",
                description: "Returns the largest integer less than or equal to val.",
                params: [
                    { name: "val", type: "float", description: "The value to get the floor of." }
                ],
                returnType: "integer",
                examples: ["integer result = llFloor(3.7); // result will be 3"]
            },
            llFmod: {
                signature: "float llFmod(float a, float b)",
                description: "Returns the remainder of a divided by b.",
                params: [
                    { name: "a", type: "float", description: "The dividend." },
                    { name: "b", type: "float", description: "The divisor." }
                ],
                returnType: "float",
                examples: ["float result = llFmod(5.3, 2.0); // result will be 1.3"]
            },
            llFrand: {
                signature: "float llFrand(float mag)",
                description: "Returns a random float between 0.0 and mag.",
                params: [
                    { name: "mag", type: "float", description: "The upper bound (exclusive) of the random range." }
                ],
                returnType: "float",
                examples: ["float random = llFrand(10.0); // random will be between 0.0 and 10.0"]
            },
            llLog: {
                signature: "float llLog(float val)",
                description: "Returns the natural logarithm (base e) of val.",
                params: [
                    { name: "val", type: "float", description: "The value to get the natural logarithm of." }
                ],
                returnType: "float",
                examples: ["float result = llLog(2.718282); // result will be about 1.0"]
            },
            llLog10: {
                signature: "float llLog10(float val)",
                description: "Returns the base-10 logarithm of val.",
                params: [
                    { name: "val", type: "float", description: "The value to get the base-10 logarithm of." }
                ],
                returnType: "float",
                examples: ["float result = llLog10(100.0); // result will be 2.0"]
            },
            llPow: {
                signature: "float llPow(float base, float exponent)",
                description: "Returns base raised to the power of exponent.",
                params: [
                    { name: "base", type: "float", description: "The base value." },
                    { name: "exponent", type: "float", description: "The exponent value." }
                ],
                returnType: "float",
                examples: ["float result = llPow(2.0, 3.0); // result will be 8.0"]
            },
            llRadiansToDegrees: {
                signature: "float llRadiansToDegrees(float radians)",
                description: "Converts radians to degrees.",
                params: [
                    { name: "radians", type: "float", description: "The angle in radians." }
                ],
                returnType: "float",
                examples: ["float degrees = llRadiansToDegrees(PI); // degrees will be 180.0"]
            },
            llRound: {
                signature: "integer llRound(float val)",
                description: "Rounds val to the nearest integer.",
                params: [
                    { name: "val", type: "float", description: "The value to round." }
                ],
                returnType: "integer",
                examples: ["integer result = llRound(3.7); // result will be 4"]
            },
            llSin: {
                signature: "float llSin(float theta)",
                description: "Returns the sine of theta (in radians).",
                params: [
                    { name: "theta", type: "float", description: "The angle in radians." }
                ],
                returnType: "float",
                examples: ["float result = llSin(PI/2); // result will be 1.0"]
            },
            llSqrt: {
                signature: "float llSqrt(float val)",
                description: "Returns the square root of val.",
                params: [
                    { name: "val", type: "float", description: "The value to get the square root of." }
                ],
                returnType: "float",
                examples: ["float result = llSqrt(16.0); // result will be 4.0"]
            },
            llTan: {
                signature: "float llTan(float theta)",
                description: "Returns the tangent of theta (in radians).",
                params: [
                    { name: "theta", type: "float", description: "The angle in radians." }
                ],
                returnType: "float",
                examples: ["float result = llTan(PI/4); // result will be about 1.0"]
            },
            llListStatistics: {
                signature: "float llListStatistics(integer operation, list src)",
                description: "Performs statistical operations on a list.",
                params: [
                    { name: "operation", type: "integer", description: "The type of statistical operation to perform." },
                    { name: "src", type: "list", description: "The source list to perform statistics on." }
                ],
                returnType: "float",
                examples: ["float avg = llListStatistics(LIST_STAT_MEAN, [1, 2, 3, 4, 5]); // avg will be 3.0"]
            },
            
            // String Functions
            llGetSubString: {
                signature: "string llGetSubString(string src, integer start, integer end)",
                description: "Returns a substring from src between start and end indices.",
                params: [
                    { name: "src", type: "string", description: "The source string." },
                    { name: "start", type: "integer", description: "The starting index (0-based)." },
                    { name: "end", type: "integer", description: "The ending index (inclusive)." }
                ],
                returnType: "string",
                examples: ["string sub = llGetSubString(\"Hello World\", 0, 4); // sub will be \"Hello\""]
            },
            llInsertString: {
                signature: "string llInsertString(string dst, integer pos, string src)",
                description: "Inserts src into dst at position pos.",
                params: [
                    { name: "dst", type: "string", description: "The destination string." },
                    { name: "pos", type: "integer", description: "The position to insert at (0-based)." },
                    { name: "src", type: "string", description: "The string to insert." }
                ],
                returnType: "string",
                examples: ["string result = llInsertString(\"Hello World\", 5, \" Beautiful\"); // result will be \"Hello Beautiful World\""]
            },
            llStringLength: {
                signature: "integer llStringLength(string str)",
                description: "Returns the length of str.",
                params: [
                    { name: "str", type: "string", description: "The string to measure." }
                ],
                returnType: "integer",
                examples: ["integer length = llStringLength(\"Hello\"); // length will be 5"]
            },
            llStringTrim: {
                signature: "string llStringTrim(string src, integer type)",
                description: "Trims whitespace from src based on type.",
                params: [
                    { name: "src", type: "string", description: "The source string." },
                    { name: "type", type: "integer", description: "The type of trim (STRING_TRIM_HEAD, STRING_TRIM_TAIL, or STRING_TRIM)." }
                ],
                returnType: "string",
                examples: ["string trimmed = llStringTrim(\"  Hello  \", STRING_TRIM); // trimmed will be \"Hello\""]
            },
            llToLower: {
                signature: "string llToLower(string src)",
                description: "Converts src to lowercase.",
                params: [
                    { name: "src", type: "string", description: "The source string." }
                ],
                returnType: "string",
                examples: ["string lower = llToLower(\"Hello World\"); // lower will be \"hello world\""]
            },
            llToUpper: {
                signature: "string llToUpper(string src)",
                description: "Converts src to uppercase.",
                params: [
                    { name: "src", type: "string", description: "The source string." }
                ],
                returnType: "string",
                examples: ["string upper = llToUpper(\"Hello World\"); // upper will be \"HELLO WORLD\""]
            },
            llSubStringIndex: {
                signature: "integer llSubStringIndex(string src, string pattern)",
                description: "Returns the position of pattern in src or -1 if not found.",
                params: [
                    { name: "src", type: "string", description: "The source string to search." },
                    { name: "pattern", type: "string", description: "The pattern to search for." }
                ],
                returnType: "integer",
                examples: ["integer pos = llSubStringIndex(\"Hello World\", \"World\"); // pos will be 6"]
            },
            llDeleteSubString: {
                signature: "string llDeleteSubString(string src, integer start, integer end)",
                description: "Removes the substring from start to end in src.",
                params: [
                    { name: "src", type: "string", description: "The source string." },
                    { name: "start", type: "integer", description: "The starting index (0-based)." },
                    { name: "end", type: "integer", description: "The ending index (inclusive)." }
                ],
                returnType: "string",
                examples: ["string result = llDeleteSubString(\"Hello World\", 5, 10); // result will be \"Hello\""]
            },
            llBase64ToString: {
                signature: "string llBase64ToString(string str)",
                description: "Converts a base64-encoded string to a regular string.",
                params: [
                    { name: "str", type: "string", description: "The base64-encoded string." }
                ],
                returnType: "string",
                examples: ["string decoded = llBase64ToString(\"SGVsbG8=\"); // decoded will be \"Hello\""]
            },
            llStringToBase64: {
                signature: "string llStringToBase64(string str)",
                description: "Converts a string to its base64-encoded form.",
                params: [
                    { name: "str", type: "string", description: "The string to encode." }
                ],
                returnType: "string",
                examples: ["string encoded = llStringToBase64(\"Hello\"); // encoded will be \"SGVsbG8=\""]
            },
            llEscapeURL: {
                signature: "string llEscapeURL(string url)",
                description: "URL-encodes a string.",
                params: [
                    { name: "url", type: "string", description: "The string to URL-encode." }
                ],
                returnType: "string",
                examples: ["string escaped = llEscapeURL(\"Hello World\"); // escaped will be \"Hello%20World\""]
            },
            llUnescapeURL: {
                signature: "string llUnescapeURL(string url)",
                description: "URL-decodes a string.",
                params: [
                    { name: "url", type: "string", description: "The URL-encoded string." }
                ],
                returnType: "string",
                examples: ["string unescaped = llUnescapeURL(\"Hello%20World\"); // unescaped will be \"Hello World\""]
            },
            
            // List Functions
            llDeleteSubList: {
                signature: "list llDeleteSubList(list src, integer start, integer end)",
                description: "Removes elements from src between start and end indices.",
                params: [
                    { name: "src", type: "list", description: "The source list." },
                    { name: "start", type: "integer", description: "The starting index (0-based)." },
                    { name: "end", type: "integer", description: "The ending index (inclusive)." }
                ],
                returnType: "list",
                examples: ["list result = llDeleteSubList([1, 2, 3, 4, 5], 1, 3); // result will be [1, 5]"]
            },
            // ... add more functions ...
            
            // Add hundreds more functions here, grouped by category
        },
        
        // Function categories
        functionGroups: {
            "Math": ["llAbs", "llAcos", "llAsin", "llAtan2", "llCeil", "llCos", "llDegreesToRadians", "llFloor", "llFmod", "llFrand", "llLog", "llLog10", "llPow", "llRadiansToDegrees", "llRound", "llSin", "llSqrt", "llTan", "llListStatistics"],
            "String": ["llGetSubString", "llInsertString", "llStringLength", "llStringTrim", "llToLower", "llToUpper", "llSubStringIndex", "llDeleteSubString", "llBase64ToString", "llStringToBase64", "llEscapeURL", "llUnescapeURL"],
            "List": ["llDeleteSubList", "llGetListEntryType", "llGetListLength", "llList2Float", "llList2Integer", "llList2ListStrided", "llList2Rot", "llList2String", "llList2Vector", "llListFindList", "llListInsertList", "llListRandomize", "llListReplaceList", "llListSort"],
            "Physics": ["llApplyImpulse", "llApplyRotationalImpulse", "llBreakAllLinks", "llBreakLink", "llCollisionFilter", "llCollisionSound", "llCollisionSprite"],
            "Avatar": ["llStartAnimation", "llStopAnimation", "llSetAnimationOverride", "llResetAnimationOverride"],
            "Camera": ["llSetCameraAtOffset", "llSetCameraEyeOffset", "llClearCameraParams", "llSetCameraParams"],
            "Object": ["llGetObjectName", "llGetObjectDesc", "llSetObjectName", "llSetObjectDesc", "llGetPos", "llSetPos", "llGetRot", "llSetRot", "llGetScale", "llSetScale"],
            "Communication": ["llSay", "llWhisper", "llShout", "llListen", "llListenRemove", "llEmail", "llInstantMessage", "llRegionSay"],
            "Sensor": ["llSensor", "llSensorRepeat", "llSensorRemove"],
            "Inventory": ["llGetInventoryName", "llGetInventoryNumber", "llGetInventoryType", "llRemoveInventory", "llGiveInventory"],
            "Permissions": ["llRequestPermissions", "llGetPermissions", "llGetPermissionsKey"],
            "HTTP": ["llHTTPRequest", "llHTTPResponse"],
            "Movement": ["llMoveToTarget", "llStopMoveToTarget", "llTarget", "llTargetRemove"],
            "Memory": ["llGetFreeMemory", "llGetUsedMemory", "llGetMemoryLimit"]
        },
        
        // ... rest of the data structure remains the same as before ...
    };
    
    // Script templates
    const templates = {
        basic: `// Basic LSL Script Template
default
{
    state_entry()
    {
        llSay(0, "Hello, Avatar!");
    }
}`,
        touch: `// Simple Touch Responsive Script
default
{
    state_entry()
    {
        llSay(0, "Touch me!");
    }
    
    touch_start(integer total_number)
    {
        llSay(0, "Hello " + llDetectedName(0) + "!");
    }
}`,
        dialog: `// Dialog Menu Script
integer channel;
integer listener;

default
{
    state_entry()
    {
        // Generate a random channel number
        channel = (integer)(llFrand(1000000) + 100000);
        llSay(0, "Touch for menu");
    }
    
    touch_start(integer total_number)
    {
        // Remove any existing listeners
        llListenRemove(listener);
        
        // Create a new listener
        listener = llListen(channel, "", llDetectedKey(0), "");
        
        // Show dialog menu
        llDialog(llDetectedKey(0), "Choose an option:", ["Option 1", "Option 2", "Option 3"], channel);
    }
    
    listen(integer channel, string name, key id, string message)
    {
        // Handle menu selection
        if (message == "Option 1")
        {
            llSay(0, "You selected Option 1");
        }
        else if (message == "Option 2")
        {
            llSay(0, "You selected Option 2");
        }
        else if (message == "Option 3")
        {
            llSay(0, "You selected Option 3");
        }
        
        // Remove the listener
        llListenRemove(listener);
    }
}`,
        sensor: `// Object Sensor Script
default
{
    state_entry()
    {
        llSay(0, "Scanning for avatars...");
        llSensorRepeat("", NULL_KEY, AGENT, 10.0, PI, 1.0);
    }
    
    sensor(integer num_detected)
    {
        llSay(0, "Detected " + (string)num_detected + " avatars:");
        
        integer i;
        for (i = 0; i < num_detected; i++)
        {
            string name = llDetectedName(i);
            vector pos = llDetectedPos(i);
            llSay(0, name + " at " + (string)pos);
        }
    }
    
    no_sensor()
    {
        llSay(0, "No avatars detected within range.");
    }
}`,
        animation: `// Animation Controller
// Place animations in the object's inventory
list animations = ["animation1", "animation2", "animation3"];
integer current_anim = -1;

default
{
    state_entry()
    {
        llSay(0, "Touch to cycle animations");
    }
    
    touch_start(integer total_number)
    {
        // Stop current animation if one is playing
        if (current_anim >= 0)
        {
            llStopAnimation(llList2String(animations, current_anim));
        }
        
        // Move to next animation
        current_anim = (current_anim + 1) % llGetListLength(animations);
        
        // Start new animation
        string anim_name = llList2String(animations, current_anim);
        llStartAnimation(anim_name);
        llSay(0, "Playing: " + anim_name);
    }
}
`;
    
    // Initialize with line numbers and default template
    updateLineNumbers();
    editor.value = templates.basic;
    
    // Event Listeners
    editor.addEventListener('input', updateLineNumbers);
    editor.addEventListener('scroll', syncLineNumbersScroll);
    
    // Category selection
    categoryList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            selectCategory(e.target.getAttribute('data-category'), e.target);
        }
    });
    
    // Reference item selection
    referenceList.addEventListener('click', function(e) {
        if (e.target.classList.contains('function-item')) {
            const itemName = e.target.getAttribute('data-name');
            const itemType = e.target.getAttribute('data-type');
            showDocumentation(itemType, itemName);
        } else if (e.target.classList.contains('function-group-title')) {
            // Toggle function group
            const groupContent = e.target.nextElementSibling;
            groupContent.classList.toggle('active');
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchFunctions(searchTerm);
    });
    
    // Button actions
    newScriptBtn.addEventListener('click', function() {
        if (confirm('Create a new script? This will clear the current editor content.')) {
            editor.value = templates.basic;
            updateLineNumbers();
        }
    });
    
    saveScriptBtn.addEventListener('click', function() {
        const scriptContent = editor.value;
        const blob = new Blob([scriptContent], {type: 'text/plain'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'script.lsl';
        a.click();
        URL.revokeObjectURL(a.href);
    });
    
    copyScriptBtn.addEventListener('click', function() {
        editor.select();
        document.execCommand('copy');
        alert('Script copied to clipboard!');
    });
    
    // Template buttons
    templateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateName = this.getAttribute('data-template');
            if (templates[templateName]) {
                if (confirm('Load template? This will replace the current editor content.')) {
                    editor.value = templates[templateName];
                    updateLineNumbers();
                }
            }
        });
    });
    
    // Default to showing functions first
    document.querySelector('[data-category="functions"]').click();
    
    // Function to create category tabs for mobile view
    function createCategoryTabs() {
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'category-tabs';
        
        const categories = [
            { id: 'functions', name: 'Functions' },
            { id: 'events', name: 'Events' },
            { id: 'types', name: 'Types' },
            { id: 'constants', name: 'Constants' },
            { id: 'operators', name: 'Operators' },
            { id: 'flow', name: 'Flow Control' }
        ];
        
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.innerText = cat.name;
            btn.setAttribute('data-category', cat.id);
            btn.addEventListener('click', function() {
                selectCategory(cat.id, null, btn);
            });
            tabsContainer.appendChild(btn);
        });
        
        document.querySelector('.sidebar').insertBefore(tabsContainer, document.querySelector('.search-box'));
    }
    
    // Function to select a category
    function selectCategory(category, listItem, tabButton) {
        // Update list items
        document.querySelectorAll('#categoryList li').forEach(item => {
            item.classList.remove('active-category');
        });
        
        if (listItem) {
            listItem.classList.add('active-category');
        } else {
            // Find and highlight the list item if not provided
            const matchingItem = document.querySelector(`#categoryList li[data-category="${category}"]`);
            if (matchingItem) {
                matchingItem.classList.add('active-category');
            }
        }
        
        // Update tab buttons
        document.querySelectorAll('.category-tabs button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (tabButton) {
            tabButton.classList.add('active');
        } else {
            // Find and highlight the tab button if not provided
            const matchingButton = document.querySelector(`.category-tabs button[data-category="${category}"]`);
            if (matchingButton) {
                matchingButton.classList.add('active');
            }
        }
        
        // Update reference list
        updateReferenceList(category);
    }
    
    // Function to update reference list based on category
    function updateReferenceList(category) {
        let html = '';
        
        switch(category) {
            case 'functions':
                // Generate grouped function list
                Object.keys(lslData.functionGroups).sort().forEach(groupName => {
                    const functions = lslData.functionGroups[groupName];
                    html += `<div class="function-group">
                            <div class="function-group-title">${groupName} (${functions.length})</div>
                            <div class="function-group-content">`;
                    
                    functions.sort().forEach(func => {
                        if (lslData.functions[func]) {
                            html += `<div class="function-item" data-type="functions" data-name="${func}">${func}</div>`;
                        }
                    });
                    
                    html += `</div></div>`;
                });
                break;
            case 'events':
                Object.keys(lslData.events).sort().forEach(event => {
                    html += `<div class="function-item" data-type="events" data-name="${event}">${event}</div>`;
                });
                break;
            case 'types':
                Object.keys(lslData.types).sort().forEach(type => {
                    html += `<div class="function-item" data-type="types" data-name="${type}">${type}</div>`;
                });
                break;
            case 'constants':
                Object.keys(lslData.constants).sort().forEach(constant => {
                    html += `<div class="function-item" data-type="constants" data-name="${constant}">${constant}</div>`;
                });
                break;
            case 'operators':
                Object.keys(lslData.operators).sort().forEach(op => {
                    html += `<div class="function-item" data-type="operators" data-name="${op}">${op}</div>`;
                });
                break;
            case 'flow':
                Object.keys(lslData.flow).sort().forEach(flow => {
                    html += `<div class="function-item" data-type="flow" data-name="${flow}">${flow}</div>`;
                });
                break;
        }
        
        referenceList.innerHTML = html;
        
        // Expand first group by default
        const firstGroup = referenceList.querySelector('.function-group-content');
        if (firstGroup) {
            firstGroup.classList.add('active');
        }
    }
    
    // Function to update line numbers
    function updateLineNumbers() {
        const lines = editor.value.split('\n');
        let lineNumbersHTML = '';
        
        for (let i = 0; i < lines.length; i++) {
            lineNumbersHTML += (i + 1) + '<br>';
        }
        
        lineNumbers.innerHTML = lineNumbersHTML;
    }
    
    // Function to sync line numbers scroll with editor scroll
    function syncLineNumbersScroll() {
        lineNumbers.scrollTop = editor.scrollTop;
    }
    
    // Function to show documentation for selected item
    function showDocumentation(type, name) {
        let html = '';
        
        switch(type) {
            case 'functions':
                const func = lslData.functions[name];
                html = `<h2>${name}</h2>
                       <div class="function-signature">${func.signature}</div>
                       <p>${func.description}</p>`;
                
                if (func.params && func.params.length > 0) {
                    html += '<h3>Parameters:</h3>';
                    func.params.forEach(param => {
                        html += `<p><code class="parameter">${param.name}</code> (${param.type}): ${param.description}</p>`;
                    });
                }
                
                if (func.returnType) {
                    html += `<h3>Returns:</h3><p>${func.returnType}</p>`;
                }
                
                if (func.examples && func.examples.length > 0) {
                    html += '<h3>Examples:</h3>';
                    func.examples.forEach(example => {
                        html += `<pre><code>${example}</code></pre>`;
                    });
                }
                break;
                
            case 'events':
                const event = lslData.events[name];
                html = `<h2>${name}</h2>
                       <div class="function-signature">${event.signature}</div>
                       <p>${event.description}</p>`;
                
                if (event.params && event.params.length > 0) {
                    html += '<h3>Parameters:</h3>';
                    event.params.forEach(param => {
                        html += `<p><code class="parameter">${param.name}</code> (${param.type}): ${param.description}</p>`;
                    });
                }
                
                if (event.examples && event.examples.length > 0) {
                    html += '<h3>Examples:</h3>';
                    event.examples.forEach(example => {
                        html += `<pre><code>${example}</code></pre>`;
                    });
                }
                break;
                
            case 'types':
                const type_info = lslData.types[name];
                html = `<h2>${name}</h2>
                       <p>${type_info.description}</p>`;
                
                if (type_info.examples && type_info.examples.length > 0) {
                    html += '<h3>Examples:</h3>';
                    type_info.examples.forEach(example => {
                        html += `<pre><code>${example}</code></pre>`;
                    });
                }
                break;
                
            case 'constants':
                const constant = lslData.constants[name];
                html = `<h2>${name}</h2>
                       <p><strong>Value:</strong> ${constant.value}</p>
                       <p>${constant.description}</p>`;
                break;
                
            case 'operators':
                const operator = lslData.operators[name];
                html = `<h2>${name} Operators</h2>
                       <p>${operator.description}</p>
                       <ul>`;
                operator.content.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                html += '</ul>';
                break;
                
            case 'flow':
                const flow = lslData.flow[name];
                html = `<h2>${name}</h2>
                       <p>${flow.description}</p>
                       <h3>Syntax:</h3>
                       <pre><code>${flow.syntax}</code></pre>`;
                
                if (flow.examples && flow.examples.length > 0) {
                    html += '<h3>Examples:</h3>';
                    flow.examples.forEach(example => {
                        html += `<pre><code>${example}</code></pre>`;
                    });
                }
                break;
        }
        
        documentationContent.innerHTML = html;
    }
    
    // Function to search across all functions, events, etc.
    function searchFunctions(term) {
        if (!term) {
            // If search is empty, show currently selected category
            const activeCategory = document.querySelector('#categoryList li.active-category');
            if (activeCategory) {
                updateReferenceList(activeCategory.getAttribute('data-category'));
            }
            return;
        }
        
        let html = '';
        let results = [];
        
        // Search functions
        Object.keys(lslData.functions).forEach(func => {
            if (func.toLowerCase().includes(term)) {
                results.push({name: func, type: 'functions'});
            }
        });
        
        // Search events
        Object.keys(lslData.events).forEach(event => {
            if (event.toLowerCase().includes(term)) {
                results.push({name: event, type: 'events'});
            }
        });
        
        // Search types
        Object.keys(lslData.types).forEach(type => {
            if (type.toLowerCase().includes(term)) {
                results.push({name: type, type: 'types'});
            }
        });
        
        // Search constants
        Object.keys(lslData.constants).forEach(constant => {
            if (constant.toLowerCase().includes(term)) {
                results.push({name: constant, type: 'constants'});
            }
        });
        
        // Generate HTML for results
        results.forEach(result => {
            html += `<div class="function-item" data-type="${result.type}" data-name="${result.name}">${result.name} (${result.type})</div>`;
        });
        
        referenceList.innerHTML = html || '<p>No results found</p>';
    }
    
    // Add resize handling for better responsiveness
    window.addEventListener('resize', function() {
        adjustLayout();
    });
    
    // Initial layout adjustment
    adjustLayout();
    
    function adjustLayout() {
        const width = window.innerWidth;
        // Any specific adjustments based on viewport size can be done here
    }
});