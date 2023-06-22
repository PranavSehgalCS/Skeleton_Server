package PersistanceTests;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import com.project.api.projectapi.model.Template;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.junit.jupiter.api.Assertions.assertEquals;
import com.project.api.projectapi.persistance.Template.TemplateFileDAO;

@Tag("persistence-tier")
public class TemplateDAOTest {
    private ObjectMapper testObjectMapper;
    private TemplateFileDAO templateFileDAO;
    private Template[] testTemplateArray;
    private Map<Integer, Template> testTemplateHolder = new TreeMap<Integer,Template>();


    @BeforeEach
    public void setupTest() throws IOException{
        testObjectMapper = mock(ObjectMapper.class);
        
        testTemplateHolder.clear();
        testTemplateHolder.put(1, new Template(1, "1st Name", "The 1st Message", true));
        testTemplateHolder.put(2, new Template(2, "2nd Name", "The 2nd Message", false));
        testTemplateHolder.put(3, new Template(3, "3rd Name", "The 3rd Message", false));
        testTemplateArray = new Template[3];
        testTemplateHolder.values().toArray(testTemplateArray);

        when(testObjectMapper.readValue(new File("FileName"),Template[].class))
        .thenReturn(testTemplateArray);
        templateFileDAO = new TemplateFileDAO(testObjectMapper, "FileName");

        templateFileDAO.TemplateHolder.put(1, testTemplateHolder.get(1));
        templateFileDAO.TemplateHolder.put(2, testTemplateHolder.get(2));
        templateFileDAO.TemplateHolder.put(3, testTemplateHolder.get(3));
      
        templateFileDAO.TemplateHolder.values().toArray(testTemplateArray);
        testTemplateArray = new Template[templateFileDAO.TemplateHolder.size()];
        templateFileDAO.TemplateHolder.values().toArray(testTemplateArray);

        templateFileDAO.nextID = 4;
        TemplateFileDAO.initialized = true;
    }

    
    
    @Test
    public void test_getTemplates(){
        Template expected_one = templateFileDAO.TemplateHolder.get(1);
        Template expected_two = templateFileDAO.TemplateHolder.get(2);
        Template[] expected_all = testTemplateArray;

        Template actual_one = templateFileDAO.getTemplates(1)[0];
        Template actual_two = templateFileDAO.getTemplates(2)[0];
        Template[] actual_all = templateFileDAO.getTemplates(-1);

        assertEquals(expected_one, actual_one);
        assertEquals(expected_two, actual_two);
        assertEquals(expected_all.length, actual_all.length); 
        for(int i = 0; i<expected_all.length; i++){
            assertEquals(expected_all[i],actual_all[i]);
        }
    }

    @Test
    public void test_createTemplate(){
        Template[] expected_before_value = new Template[1];
        Template[] actual_before_value = templateFileDAO.getTemplates(4);
       
        assertEquals(expected_before_value[0], actual_before_value[0]);
        assertEquals(expected_before_value.length, expected_before_value.length);

        assertEquals(true , templateFileDAO.createTemplate("4th Name", "The 4th Message", true));
        
        Template[] actual_after_value  = templateFileDAO.getTemplates(-1);
        Template[] expected_after_value = new Template[templateFileDAO.TemplateHolder.size()];
        templateFileDAO.TemplateHolder.values().toArray(expected_after_value);

        assertEquals(expected_after_value.length, actual_after_value.length);
        assertEquals(expected_after_value[0], actual_after_value[0]);
    } 

    @Test
    public void test_updateTemplate(){
        
        Boolean expected_non_existant = false;
        Boolean acualt_non_existant = templateFileDAO.updateTemplate(4,null, null,false);
        assertEquals(expected_non_existant, acualt_non_existant);
        
        Boolean expected_existing = true;
        int expected_updated_temid = 1;
        String expected_updated_tname = "New Name";
        String expected_updated_tmess = "New Message";
        Boolean expected_updated_tbool = false;

        assertEquals(expected_existing, templateFileDAO.updateTemplate(expected_updated_temid, expected_updated_tname, expected_updated_tmess, expected_updated_tbool));
        Template actual_updated_value = templateFileDAO.getTemplates(expected_updated_temid)[0];
        
        assertEquals(expected_updated_temid, actual_updated_value.getTemid());
        assertEquals(expected_updated_tname, actual_updated_value.getTname());
        assertEquals(expected_updated_tmess, actual_updated_value.getTmess());
        assertEquals(expected_updated_tbool, actual_updated_value.getTbool());
    }
    @Test
    public void test_deleteTemplate(){
        Template[] expected_one_val = new Template[1];
        Template[] expected_all_val = new Template[1];
        expected_all_val[0] = templateFileDAO.TemplateHolder.get(2);

        assertEquals(true,  templateFileDAO.deleteTemplate(1));
        assertEquals(true,  templateFileDAO.deleteTemplate(3));
        assertEquals(false, templateFileDAO.deleteTemplate(1));
        assertEquals(false, templateFileDAO.deleteTemplate(3));
        assertEquals(false, templateFileDAO.deleteTemplate(4));

        Template[] actual_one_val = templateFileDAO.getTemplates(1);
        Template[] actual_all_val = templateFileDAO.getTemplates(-1); 

        assertEquals(expected_one_val[0], actual_one_val[0]); 
        assertEquals(expected_all_val[0], actual_all_val[0]);
        assertEquals(expected_one_val.length, actual_one_val.length);
        assertEquals(expected_all_val.length, actual_all_val.length);
    }
}
