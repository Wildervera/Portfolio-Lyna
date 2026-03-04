import sys

def remove_lines(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    start_idx = -1
    for i, line in enumerate(lines):
        if "{/* Next Project Section — Frame 293 */}" in line:
            start_idx = i
            break
            
    if start_idx == -1:
        print("Could not find start index")
        sys.exit(1)
        
    end_idx = -1
    for i in range(start_idx, len(lines)):
        if "        {/* Hidden next project trigger for scroll transition */}" in line:
            pass # just a marker
        
    # we know the exact line numbers from previous view_files
    # but it's safer to find "export default ProjectDetail" and keep just the closing div before it
    
    closing_divs = []
    closing_divs.append("      </div>\n")
    closing_divs.append("    </div>\n")
    closing_divs.append("  );\n")
    closing_divs.append("};\n")
    
    export_idx = -1
    for i in range(len(lines)):
        if "export default ProjectDetail" in lines[i]:
            export_idx = i
            break
            
    # lines to keep: 0 to start_idx (exclusive)  ->  before {/* Next ...
    # then closing_divs
    # then from export_idx - 1 (empty line) to end
    
    new_lines = lines[:start_idx] + closing_divs + lines[export_idx-1:]
    
    with open(filepath, 'w') as f:
        f.writelines(new_lines)
    print("Successfully updated file")

remove_lines('src/components/ProjectDetail.tsx')
