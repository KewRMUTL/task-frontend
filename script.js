// ==========================================
// Lab 4 ข้อ 2: สร้างตัวแปรเก็บรายการงาน (tasks)
// ==========================================
// let tasks = [
//     { id: 1, title: "เรียน HTML/CSS เบื้องต้น", completed: true, priority: "low" },
//     { id: 2, title: "เขียน JavaScript ES6", completed: false, priority: "high" },
//     { id: 3, title: "เชื่อมต่อ Database", completed: false, priority: "medium" }
// ];


// ==========================================
// Lab 6 ข้อ 1: ปรับตัวแปร tasks ให้เป็น Array ว่าง
// ==========================================
let tasks = [];


console.log("--- ข้อ 2: ข้อมูล tasks ตั้งต้น ---");
console.table(tasks);

// ทดลองใช้ filter() กรองเฉพาะงานที่ยังไม่เสร็จ (Capture #1)
const uncompletedTasks = tasks.filter(task => !task.completed);
console.log("งานที่ยังไม่เสร็จ (completed: false):", uncompletedTasks);


// ==========================================
// Lab 4 ข้อ 3: ฟังก์ชัน displayTasks() วนลูปแสดงผล
// ==========================================
const displayTasks = () => {
    console.log("--- รายการงานทั้งหมด ---");
    tasks.forEach(task => {
        // ใช้ตัวแปร status เพื่อแสดงเครื่องหมาย [x] หรือ [ ]
        const status = task.completed ? "[x]" : "[ ]";
        // ใช้ Template Literals (``) ในการต่อข้อความ
        console.log(`${status} ID: ${task.id} - ${task.title} (ความสำคัญ: ${task.priority})`);
    });
};

displayTasks();


// ==========================================
// Lab 4 ข้อ 4: ฟังก์ชัน getTaskById(id) ค้นหางานด้วย ID (.find)
// ==========================================
const getTaskById = (id) => {
    return tasks.find(task => task.id === id);
};

console.log("ค้นหางาน ID 2:", getTaskById(2));


// ==========================================
// Lab 4 ข้อ 5: ฟังก์ชัน getUrgentTasks() กรองงานด่วน (.filter)
// ==========================================
const getUrgentTasks = () => {
    return tasks.filter(task => !task.completed && task.priority === "high");
};

console.log("งานด่วนที่ยังไม่เสร็จ:");
console.table(getUrgentTasks());


// ==========================================
// Lab 4 ข้อ 6: ดึงเฉพาะชื่อของงาน title (.map) (Capture #2)
// ==========================================
const taskTitles = tasks.map(task => task.title);
console.log("--- ข้อ 6: รายชื่อเฉพาะ Title ---");
console.log(taskTitles);


// =========================================================
// Lab 4 ข้อ 7: ฟังก์ชันเพิ่มงานใหม่ (Create) โดยให้สร้างฟังก์ชัน addTask(title, priority)
// =========================================================
// const addTask = (title, priority) => {
//     // หา ID ใหม่ โดยการนับจำนวนของที่มีอยู่แล้วบวก 1
//     const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
//     // สร้าง Object งานใหม่
//     const newTask = {
//         id: newId,
//         title: title,
//         completed: false, // งานใหม่ต้องยังไม่เสร็จเสมอ
//         priority: priority
//     };
//     // นำไปต่อท้าย Array เดิม
//     tasks.push(newTask);
//     console.log(`เพิ่มงานใหม่สำเร็จ: ${title}`);
//     };
const addTask = async (title, priority) => {
    try {
        // await fetch('https://cpe-task-api-3jif.onrender.com/tasks', {
        await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // ต้องบอกเซิร์ฟเวอร์ว่าส่ง JSON ไป
            },
            body: JSON.stringify({ title: title, priority: priority }) // แพ็คของลงกล่อง
        });
        // เมื่อเพิ่มที่ Backend เสร็จ สั่งดึงข้อมูลล่าสุดมาวาดใหม่
        fetchTasks();
    } catch (error) {
        console.error("เพิ่มงานไม่สำเร็จ:", error);
    }
};

// ทดสอบเรียกใช้งาน
addTask("ออกแบบ UI ตัวใหม่", "high");
console.table(tasks); // ตรวจสอบว่างานเพิ่มเข้าไปหรือยัง


// =========================================================
// Lab 4 ข้อ 8: ฟังก์ชันเปลี่ยนสถานะ (Update) โดยให้นศ. สร้างฟังก์ชัน toggleTaskStatus(id)
// ถ้างานเสร็จแล้วให้เปลี่ยนเป็นยังไม่เสร็จ (สลับค่า true/false)
// =========================================================
// const toggleTaskStatus = (id) => {
//     const task = tasks.find(t => t.id === id);
//     if (task) {
//         task.completed = !task.completed; // สลับค่า boolean
//         console.log(`เปลี่ยนสถานะงาน ID ${id} แล้ว`);
//     } else {
//         console.log("ไม่พบงานที่ต้องการแก้ไข");
//     }
// };
const toggleTaskStatus = async (id) => {
    try {
        await fetch(`https://cpe-task-api-3jif.onrender.com/tasks/${id}`, {
            method: 'PUT'
        });
        fetchTasks(); // ดึงข้อมูลใหม่
    } catch (error) {
        console.error("เปลี่ยนสถานะไม่สำเร็จ:", error);
    }
};


// =========================================================
// Lab 4 ข้อ 9: ฟังก์ชันลบงาน (Delete) โดยให้นศ. สร้างฟังก์ชัน deleteTask(id)
// โดยใช้ filter() เพื่อคัดงานที่ ID ตรงกันทิ้งไป
// =========================================================
// const deleteTask = (id) => {
//     // กรองเอาเฉพาะงานที่ ID "ไม่ตรงกับ" ค่าที่ส่งเข้ามา เพื่อเก็บไว้
//     tasks = tasks.filter(task => task.id !== id);
//     console.log(`ลบงาน ID ${id} สำเร็จ`);
// };
const deleteTask = async (id) => {
    try {
        await fetch(`https://cpe-task-api-3jif.onrender.com/tasks/${id}`, {
            method: 'DELETE'
        });
        fetchTasks(); // ดึงข้อมูลใหม่
    } catch (error) {
        console.error("ลบงานไม่สำเร็จ:", error);
    }
};


// // =========================================================
// // Lab 4 ข้อ 10: ให้นักศึกษาทดลองเรียกใช้ฟังก์ชันต่อเนื่องกันเป็นเนื้อเรื่อง (Scenario) (Capture #3)
// // =========================================================
// console.log("\n--- ข้อ 10: เริ่มทดสอบ Scenario ---");
// // 10.1 เพิ่มงานใหม่โดยระบุชื่อตนเอง
// addTask("ทดสอบระบบ พรไพจิตร ฉัตรวาณิชย์พร", "high");
// // 10.2 เปลี่ยนสถานะงาน ID 2
// toggleTaskStatus(2);
// // 10.3 ลบงาน ID 1
// deleteTask(1);
// // 10.4 แสดงผลลัพธ์สุดท้าย
// displayTasks();



// ==========================================
// Lab 5 - ข้อ 2: DOM Selectors
// ==========================================
const taskListElement = document.querySelector('#taskList');
const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');
const priorityInput = document.querySelector('#priorityInput');


// ==========================================
// Lab 6 - ข้อ 3: ฟังก์ชัน fetchTasks() ดึงข้อมูลจากเซิร์ฟเวอร์
// ==========================================
// ใช้คีย์เวิร์ด async หน้าฟังก์ชันเพื่อบอกว่าฟังก์ชันนี้มีการทำงานที่ต้อง "รอ"
const fetchTasks = async () => {
    try {
        // ระหว่างรอข้อมูล ให้แสดงข้อความ Loading บนหน้าจอ
        taskListElement.innerHTML = "<h3 style='text-align: center;'>กำลังดึงข้อมูลจากเซิร์ฟเวอร์...</h3>";

        // ใช้ fetch ไปขอข้อมูล และใส่ await เพื่อบอกให้ "รอจนกว่าข้อมูลจะมาถึง"
        // const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const response = await fetch('https://cpe-task-api-3jif.onrender.com/tasks');
        
        // แปลงผลลัพธ์ที่ได้ให้กลายเป็นออบเจกต์ JSON
        const data = await response.json();

        // นำข้อมูลที่ได้จากเซิร์ฟเวอร์ มาใส่ในตัวแปร tasks ของเรา
        // เนื่องจาก API ไม่มีฟิลด์ priority เราจึงเติม "low" ให้เป็นค่าเริ่มต้น
        // tasks = data.map(item => {
        //     return {
        //         id: item.id,
        //         title: item.title,
        //         completed: item.completed,
        //         priority: "low" // กำหนดค่าเริ่มต้นเอง
        //     };
        // });
        tasks = data.map(item => {
            return {
                id: item._id,
                title: item.title,
                completed: item.completed,
                priority: item.priority || "low"
            };
        });

        // เมื่อข้อมูลพร้อมแล้ว สั่งให้วาดหน้าจอใหม่
        renderTasks();
    } catch (error) {
        // ถ้าเน็ตหลุด หรือ URL ผิด จะวิ่งเข้ามาที่นี่
        console.error("เกิดข้อผิดพลาด:", error);
        taskListElement.innerHTML = "<h3 style='text-align: center; color: red;'>ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่</h3>";
    }
};


// ==========================================
// Lab 5 - ข้อ 3: ฟังก์ชันวาดหน้าจอ renderTasks()
// ==========================================
const renderTasks = () => {
    // ถ้าไม่มีงานเลย ให้แสดงข้อความแจ้งเตือน
    if (tasks.length === 0) {
        taskListElement.innerHTML = "<p>เยี่ยมมาก! ไม่มีงานค้างเลย</p>";
        return;
    }

    // นำข้อมูล Array มาแปลงเป็น HTML
    const htmlString = tasks.map(task => {
        // เช็คว่าถ้างานเสร็จแล้ว ให้ขีดฆ่าตัวหนังสือ
        const textStyle = task.completed ? "text-decoration: line-through; color: gray;" : "";
        return `
            <div class="task-card">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <!-- ฝัง ID ของงานไว้ที่ปุ่ม เพื่อให้รู้ว่ากดที่งานไหน -->
                    <input type="checkbox" onchange="handleToggle('${task.id}')" ${task.completed ? 'checked' : ''}>
                    <span style="${textStyle}">${task.title} <small>(${task.priority})</small></span>
                </div>
                <button onclick="handleDelete('${task.id}')" style="color: red; cursor: pointer;">ลบ</button>
            </div>
        `;
    }).join(''); // รวม Array ของ HTML ให้เป็น String ก้อนเดียว

    // นำก้อน HTML ไปยัดใส่ในหน้าเว็บ
    taskListElement.innerHTML = htmlString;
};


// ==========================================
// Lab 5 - ข้อ 4: Listen เมื่อมีการกด Submit ฟอร์ม
// ==========================================
taskForm.addEventListener('submit', (event) => {
    // ป้องกันไม่ให้เบราว์เซอร์รีเฟรชหน้าเว็บ (พฤติกรรมดั้งเดิมของฟอร์ม)
    event.preventDefault();

    // ดึงข้อความจากช่อง Input
    const newTitle = taskInput.value;
    const newPriority = priorityInput.value;

    // 1. เรียกใช้ฟังก์ชัน Business Logic (จาก Lab 4)
    addTask(newTitle, newPriority);

    // 2. สั่งให้วาดหน้าจอใหม่ (UI Sync)
    // renderTasks();

    // 3. ล้างค่าในช่องกรอกข้อมูลให้ว่างเปล่า
    taskInput.value = '';
});


// ==========================================
// Lab 5 - ข้อ 5: Handler สำหรับการลบและอัปเดต
// ==========================================
// ฟังก์ชันรับคำสั่งลบ
const handleDelete = (id) => {
    // เพื่อความปลอดภัย ควรถามยืนยันก่อนลบ
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบงานนี้?")) {
        deleteTask(id); // เรียก Logic ลบข้อมูล (Lab 4)
        // สั่งวาดหน้าจอใหม่
        // renderTasks();
    }
};

// ฟังก์ชันรับคำสั่งเปลี่ยนสถานะ (ติ๊กถูก)
const handleToggle = (id) => {
    toggleTaskStatus(id); // เรียก Logic สลับสถานะ (Lab 4)
    // สั่งวาดหน้าจอใหม่
    // renderTasks();
};


// ==========================================
// Lab 6 - ข้อ 4: เปลี่ยนจุดเริ่มต้นการทำงานของโปรแกรม
// ==========================================
// เรียกใช้วาดหน้าจอครั้งแรกเมื่อเปิดเว็บ
// จากเดิมใน Lab 5 สั่ง renderTasks() ทันที
// renderTasks(); <--- ลบคำสั่งนี้ทิ้ง

// เพิ่มคำสั่งนี้ ในการเรียกฟังก์ชันดึงข้อมูลแทน เมื่อดึงข้อมูลเสร็จ จะมีการเรียก renderTasks ในฟังก์ชัน fetchTasks();
fetchTasks();