import react from "react"
import './List.css'

function List() {
    return (
        <div className="list">
            <div className='list_toolbar'>
                <h2>ToolBar</h2>
                <input id='list_title' type='text' placeholder='List Title'/>
            </div>

            {//Placeholder for Dev
            }
            <div className='list_container'>
                <div className='list_section'>
                    <div className='list_section_header'>Section Header</div>
                    <div className='list_section_items'>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                    </div>
                </div>
                <div className='list_section'>
                    <div className='list_section_header'>Section Header</div>
                    <div className='list_section_items'>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                    </div>
                </div>
                <div className='list_section'>
                    <div className='list_section_header'>Section Header</div>
                    <div className='list_section_items'>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                    </div>
                </div>
                <div className='list_section'>
                    <div className='list_section_header'>Section Header</div>
                    <div className='list_section_items'>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                    </div>
                </div>
                <div className='list_section'>
                    <div className='list_section_header'>Section Header</div>
                    <div className='list_section_items'>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                        <div className='list_section_item'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List